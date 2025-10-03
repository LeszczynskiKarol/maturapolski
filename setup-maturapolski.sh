#!/bin/bash
# MaturaPolski AWS Setup - SIMPLIFIED (NO REDIS)
# Using existing subnets in vpc-0bac5e98021c2fe22

set -e

REGION="eu-central-1"
VPC_ID="vpc-0bac5e98021c2fe22"

# Existing subnets
SUBNET_A="subnet-0b9e49d649ae5e27b"  # eu-central-1a
SUBNET_B="subnet-042fd8cc2ca2af503"  # eu-central-1b
SUBNET_C="subnet-06a961ff15dc257bc"  # eu-central-1c

echo "========================================="
echo "MaturaPolski AWS Deployment"
echo "Simplified Version (No Redis)"
echo "========================================="
echo ""
echo "Region: $REGION"
echo "VPC: $VPC_ID"
echo "Subnets: $SUBNET_A, $SUBNET_B, $SUBNET_C"
echo ""

# Step 1: Get your public IP
echo "Step 1: Getting your public IP..."
echo "----------------------------------"
MY_IP=$(curl -s https://checkip.amazonaws.com)
echo "Your IP: $MY_IP"
echo ""

# Step 2: Create Security Groups
echo "Step 2: Creating Security Groups..."
echo "------------------------------------"

# Backend SG
echo "Creating Backend Security Group..."
BACKEND_SG=$(aws ec2 create-security-group \
  --group-name maturapolski-backend-sg \
  --description "MaturaPolski Backend (Node.js/Fastify + Nginx)" \
  --vpc-id $VPC_ID \
  --region $REGION \
  --query 'GroupId' \
  --output text)

echo "✓ Backend SG: $BACKEND_SG"

# Add rules for Backend
echo "Adding ingress rules..."

# SSH from your IP
aws ec2 authorize-security-group-ingress \
  --group-id $BACKEND_SG \
  --protocol tcp --port 22 \
  --cidr $MY_IP/32 \
  --region $REGION

# HTTP
aws ec2 authorize-security-group-ingress \
  --group-id $BACKEND_SG \
  --protocol tcp --port 80 \
  --cidr 0.0.0.0/0 \
  --region $REGION

# HTTPS
aws ec2 authorize-security-group-ingress \
  --group-id $BACKEND_SG \
  --protocol tcp --port 443 \
  --cidr 0.0.0.0/0 \
  --region $REGION

echo "✓ SSH from $MY_IP, HTTP/HTTPS from anywhere"
echo ""

# Database SG
echo "Creating Database Security Group..."
DB_SG=$(aws ec2 create-security-group \
  --group-name maturapolski-db-sg \
  --description "MaturaPolski PostgreSQL RDS" \
  --vpc-id $VPC_ID \
  --region $REGION \
  --query 'GroupId' \
  --output text)

echo "✓ Database SG: $DB_SG"

# PostgreSQL from Backend only
aws ec2 authorize-security-group-ingress \
  --group-id $DB_SG \
  --protocol tcp --port 5432 \
  --source-group $BACKEND_SG \
  --region $REGION

echo "✓ PostgreSQL access from Backend only"
echo ""

# Step 3: Create RDS Subnet Group
echo "Step 3: Creating RDS Subnet Group..."
echo "--------------------------------------"

aws rds create-db-subnet-group \
  --db-subnet-group-name maturapolski-db-subnet \
  --db-subnet-group-description "MaturaPolski Database Subnets" \
  --subnet-ids $SUBNET_A $SUBNET_B $SUBNET_C \
  --region $REGION

echo "✓ RDS Subnet Group created"
echo ""

# Step 4: Generate strong database password
echo "Step 4: Generating Database Password..."
echo "-----------------------------------------"

DB_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-32)
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  DATABASE PASSWORD (SAVE THIS!):"
echo "  $DB_PASSWORD"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 5: Create RDS Instance
echo "Step 5: Creating RDS PostgreSQL..."
echo "-----------------------------------"
echo "This will take approximately 10 minutes..."
echo ""

aws rds create-db-instance \
  --db-instance-identifier maturapolski-db \
  --db-instance-class db.t4g.micro \
  --engine postgres \
  --engine-version 15.5 \
  --master-username postgres \
  --master-user-password "$DB_PASSWORD" \
  --allocated-storage 20 \
  --storage-type gp3 \
  --vpc-security-group-ids $DB_SG \
  --db-subnet-group-name maturapolski-db-subnet \
  --backup-retention-period 7 \
  --preferred-backup-window "03:00-04:00" \
  --preferred-maintenance-window "mon:04:00-mon:05:00" \
  --no-publicly-accessible \
  --db-name maturapolski \
  --storage-encrypted \
  --region $REGION

echo "✓ RDS creation initiated"
echo ""

# Step 6: Find Ubuntu AMI
echo "Step 6: Finding Ubuntu 22.04 AMI..."
echo "-------------------------------------"

AMI_ID=$(aws ec2 describe-images \
  --owners 099720109477 \
  --filters "Name=name,Values=ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*" \
  --query 'sort_by(Images, &CreationDate)[-1].ImageId' \
  --output text \
  --region $REGION)

echo "✓ Using AMI: $AMI_ID"
echo ""

# Step 7: Create SSH Key
echo "Step 7: Creating SSH Key..."
echo "----------------------------"

if [ -f "maturapolski-key.pem" ]; then
    echo "⚠ Key file already exists, skipping..."
else
    aws ec2 create-key-pair \
      --key-name maturapolski-key \
      --query 'KeyMaterial' \
      --output text \
      --region $REGION > maturapolski-key.pem
    
    chmod 400 maturapolski-key.pem
    echo "✓ SSH Key created: maturapolski-key.pem"
fi
echo ""

# Step 8: Create EC2 Instance
echo "Step 8: Creating EC2 Instance..."
echo "---------------------------------"

INSTANCE_ID=$(aws ec2 run-instances \
  --image-id $AMI_ID \
  --instance-type t3.small \
  --key-name maturapolski-key \
  --security-group-ids $BACKEND_SG \
  --subnet-id $SUBNET_A \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=maturapolski-backend},{Key=Project,Value=MaturaPolski}]' \
  --block-device-mappings '[{"DeviceName":"/dev/sda1","Ebs":{"VolumeSize":30,"VolumeType":"gp3","DeleteOnTermination":true}}]' \
  --region $REGION \
  --query 'Instances[0].InstanceId' \
  --output text)

echo "✓ Instance created: $INSTANCE_ID"
echo "Waiting for instance to start..."

aws ec2 wait instance-running \
  --instance-ids $INSTANCE_ID \
  --region $REGION

EC2_IP=$(aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query 'Reservations[0].Instances[0].PublicIpAddress' \
  --output text \
  --region $REGION)

echo "✓ Instance running at: $EC2_IP"
echo ""

# Step 9: Wait for RDS
echo "Step 9: Waiting for RDS to be ready..."
echo "---------------------------------------"
echo "This may take 5-10 more minutes..."
echo ""

aws rds wait db-instance-available \
  --db-instance-identifier maturapolski-db \
  --region $REGION

DB_ENDPOINT=$(aws rds describe-db-instances \
  --db-instance-identifier maturapolski-db \
  --query 'DBInstances[0].Endpoint.Address' \
  --output text \
  --region $REGION)

echo "✓ RDS ready at: $DB_ENDPOINT"
echo ""

# Step 10: Save Configuration
echo "Step 10: Saving Configuration..."
echo "---------------------------------"

cat > deployment-config.env << EOF
# MaturaPolski Deployment Configuration
# Created: $(date)
# Region: eu-central-1

# AWS Resources
REGION=$REGION
VPC_ID=$VPC_ID
SUBNET_A=$SUBNET_A
SUBNET_B=$SUBNET_B
SUBNET_C=$SUBNET_C

# Security Groups
BACKEND_SG=$BACKEND_SG
DB_SG=$DB_SG

# EC2 Instance
INSTANCE_ID=$INSTANCE_ID
EC2_IP=$EC2_IP
EC2_USER=ubuntu
EC2_KEY=maturapolski-key.pem

# RDS Database
DB_ENDPOINT=$DB_ENDPOINT
DB_NAME=maturapolski
DB_USER=postgres
DB_PASSWORD=$DB_PASSWORD
DB_PORT=5432

# Connection String for .env
DATABASE_URL="postgresql://postgres:$DB_PASSWORD@$DB_ENDPOINT:5432/maturapolski?schema=public"
EOF

echo "✓ Configuration saved to: deployment-config.env"
echo ""

# Print summary
cat << EOF
========================================
     DEPLOYMENT SUCCESSFUL! 
========================================

RESOURCES CREATED:
------------------
✓ Security Groups: $BACKEND_SG (Backend), $DB_SG (Database)
✓ EC2 Instance: $INSTANCE_ID
✓ RDS Database: maturapolski-db

CONNECTION INFO:
----------------
SSH Access:
  ssh -i maturapolski-key.pem ubuntu@$EC2_IP

Database:
  Host: $DB_ENDPOINT
  Port: 5432
  Database: maturapolski
  User: postgres
  Password: (saved in deployment-config.env)

DATABASE CONNECTION STRING:
---------------------------
DATABASE_URL="postgresql://postgres:$DB_PASSWORD@$DB_ENDPOINT:5432/maturapolski?schema=public"

NEXT STEPS:
-----------
1. Connect to EC2:
   ssh -i maturapolski-key.pem ubuntu@$EC2_IP

2. Follow the deployment guide in:
   DEPLOYMENT_SIMPLE.md

3. Configure your domain in Route 53

ESTIMATED MONTHLY COST:
-----------------------
• EC2 t3.small: ~\$15
• RDS db.t4g.micro: ~\$12
• S3 + CloudFront: ~\$2-5
• Total: ~\$27-32/month

All configuration saved to: deployment-config.env
========================================
EOF