#!/usr/bin/env python3
import json
import subprocess
import sys

def run_stripe_command(command):
    """Execute Stripe CLI command and return the result"""
    try:
        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr}")
        return None

def create_product(product_data):
    """Create a product on the new Stripe account"""
    # Build the command
    cmd = f'stripe products create --name "{product_data["name"]}"'
    
    if product_data.get("description"):
        # Escape quotes in description
        desc = product_data["description"].replace('"', '\\"')
        cmd += f' --description "{desc}"'
    
    cmd += f' --type {product_data["type"]}'
    
    # Add metadata if exists
    if product_data.get("metadata"):
        for key, value in product_data["metadata"].items():
            cmd += f' --metadata {key}="{value}"'
    
    print(f"\n🔹 Creating product: {product_data['name']}")
    result = run_stripe_command(cmd)
    
    if result:
        new_product = json.loads(result)
        print(f"✅ Created product: {new_product['id']}")
        return new_product
    return None

def create_price(price_data, old_product_id, new_product_id):
    """Create a price for the product"""
    cmd = f'stripe prices create --product {new_product_id}'
    cmd += f' --currency {price_data["currency"]}'
    cmd += f' --unit-amount {price_data["unit_amount"]}'
    
    # Handle recurring vs one-time
    if price_data["type"] == "recurring":
        interval = price_data["recurring"]["interval"]
        cmd += f' --recurring interval={interval}'
    
    # Add nickname if exists
    if price_data.get("nickname"):
        cmd += f' --nickname "{price_data["nickname"]}"'
    
    # Add metadata if exists
    if price_data.get("metadata"):
        for key, value in price_data["metadata"].items():
            cmd += f' --metadata {key}="{value}"'
    
    print(f"  💰 Creating price: {price_data.get('nickname', 'No nickname')} - {price_data['unit_amount']/100} {price_data['currency'].upper()}")
    result = run_stripe_command(cmd)
    
    if result:
        new_price = json.loads(result)
        print(f"  ✅ Created price: {new_price['id']}")
        return new_price
    return None

def load_json_file(filename):
    """Load JSON file with proper encoding handling"""
    encodings = ['utf-8-sig', 'utf-8', 'utf-16', 'cp1252', 'latin1']
    
    for encoding in encodings:
        try:
            with open(filename, 'r', encoding=encoding) as f:
                return json.load(f)
        except (UnicodeDecodeError, UnicodeError):
            continue
        except Exception as e:
            print(f"Error loading {filename} with {encoding}: {e}")
            continue
    
    raise Exception(f"Could not load {filename} with any known encoding")

def main():
    # Load products
    print("📦 Loading products from products.json...")
    products_data = load_json_file('products.json')
    
    # Load prices
    print("💵 Loading prices from prices.json...")
    prices_data = load_json_file('prices.json')
    
    products = products_data['data']
    prices = prices_data['data']
    
    print(f"\n📊 Found {len(products)} products and {len(prices)} prices")
    print("=" * 60)
    
    # Map old product IDs to new product IDs
    product_id_map = {}
    
    # Create products
    for product in products:
        if not product.get('active', True):
            print(f"\n⏭️  Skipping inactive product: {product['name']}")
            continue
        
        new_product = create_product(product)
        if new_product:
            product_id_map[product['id']] = new_product['id']
    
    print("\n" + "=" * 60)
    print("📋 Product ID Mapping:")
    for old_id, new_id in product_id_map.items():
        print(f"  {old_id} -> {new_id}")
    
    print("\n" + "=" * 60)
    print("💰 Creating prices...")
    
    # Create prices
    created_prices = 0
    for price in prices:
        if not price.get('active', True):
            print(f"\n⏭️  Skipping inactive price: {price.get('id')}")
            continue
        
        old_product_id = price['product']
        
        if old_product_id not in product_id_map:
            print(f"\n⚠️  Warning: Product {old_product_id} not found in mapping, skipping price {price['id']}")
            continue
        
        new_product_id = product_id_map[old_product_id]
        new_price = create_price(price, old_product_id, new_product_id)
        if new_price:
            created_prices += 1
    
    print("\n" + "=" * 60)
    print(f"✨ Migration complete!")
    print(f"📦 Created {len(product_id_map)} products")
    print(f"💰 Created {created_prices} prices")
    print("=" * 60)
    
    # Save mapping to file
    with open('product_id_mapping.json', 'w') as f:
        json.dump(product_id_map, indent=2, fp=f)
    print("\n💾 Product ID mapping saved to: product_id_mapping.json")

if __name__ == "__main__":
    main()