// backend/prisma/delete-old-exercises.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const idsToDelete = [
  "cmmv8x0bf001fqhyfbcv5y8sz",
  "cmmv8x0bd001eqhyf0gm5jlfg",
  "cmmv8x0bb001dqhyfpgwrur09",
  "cmmv8x0b8001cqhyf1nl08shh",
  "cmmv8x0b6001bqhyfh1qf23oj",
  "cmmv8x0b4001aqhyfjj4vrlu6",
  "cmmv8x0b10019qhyffvzexyx1",
  "cmmv8x0az0018qhyfcfafg8m4",
  "cmmv8x0ax0017qhyflhq71mbq",
  "cmmv8x0av0016qhyfmjx0v77c",
  "cmmv8x0at0015qhyfqai9mjg9",
  "cmmv8x0ar0014qhyfu0dxfq6d",
  "cmmv8x0ao0013qhyfze7u47dc",
  "cmmv8x0al0012qhyf4hsulbew",
  "cmmv8x0aj0011qhyfjs6onoj2",
  "cmmv8x0ah0010qhyf27rvcaie",
  "cmmv8x0ae000zqhyfmwq68qf9",
  "cmmv8x0ab000yqhyflugj5uwu",
  "cmmv8x0a9000xqhyfvgtcgavw",
  "cmmv8x0a7000wqhyf6gjori35",
  "cmmv8x0a5000vqhyfps9fwm28",
  "cmmv8x0a3000uqhyf20y5vbce",
  "cmmv8x0a1000tqhyfelvsb6db",
  "cmmv8x09y000sqhyfb9qygjx1",
  "cmmv8x09v000rqhyf4bj0wufz",
  "cmmv8x09s000qqhyfmxxgt89s",
  "cmmv8x09q000pqhyf9iebq7ql",
  "cmmv8x09o000oqhyf1xqdqo62",
  "cmmv8x09l000nqhyfarublwy5",
  "cmmv8x09j000mqhyfpg50z8zm",
  "cmmv8x09h000lqhyfgrglkycu",
  "cmmv8x09e000kqhyf2gr8xohj",
  "cmmv8x09c000jqhyf8k5ai09y",
  "cmmv8x09a000iqhyf5ohjnnai",
  "cmmv8x098000hqhyfutr5vseb",
  "cmmv8x095000gqhyfeps5rxp9",
  "cmmv8x093000fqhyfppqdzhds",
  "cmmv8x091000eqhyfzffgk8sh",
  "cmmv8x08z000dqhyfiq83wq8u",
  "cmmv8x08w000cqhyfbfxqctuf",
  "cmmv8x08t000bqhyfo3o3e8kx",
  "cmmv8x08r000aqhyftax7jhhf",
  "cmmv8x08p0009qhyf322lny7y",
  "cmmv8x08m0008qhyfzx9n4a0c",
  "cmmv8x08k0007qhyfbqo8iwcf",
  "cmmv8x08h0006qhyfflknjrnr",
  "cmmv8x08e0005qhyf8a9446u0",
  "cmmv8x08c0004qhyf92sbxwsd",
  "cmmv8x0890003qhyfug0p2nme",
  "cmmv8x0870002qhyfbtcczi1c",
  "cmmv8x0840001qhyfeyebeupr",
  "cmmv8x07s0000qhyfpj6ucssm",
  "cmmv7fbfd002qqhxp9kutkrpy",
  "cmmv7fbf9002pqhxpnb6oum42",
  "cmmv7fbf7002oqhxpkarvjlum",
  "cmmv7fbf5002nqhxpgain97ie",
  "cmmv7fbf2002mqhxpxgfvny97",
  "cmmv7fbf0002lqhxpcfmvm6nh",
  "cmmv7fbey002kqhxp56pq94jb",
  "cmmv7fbew002jqhxpd1d44y7d",
  "cmmv7fbet002iqhxp8udn0z26",
  "cmmv7fbeq002hqhxpie26yj9h",
  "cmmv7fbeo002gqhxp1s9vodt8",
  "cmmv7fbel002fqhxpnvt9208r",
  "cmmv7fbej002eqhxpjhz7asoh",
  "cmmv7fbeg002dqhxpzbayfg4g",
  "cmmv7fbed002cqhxpw19uc8pt",
  "cmmv7fbeb002bqhxpa5hztby9",
  "cmmv7fbe9002aqhxpst5i2m9i",
  "cmmv7fbe50029qhxp98kpjfhp",
  "cmmv7fbe30028qhxpmf0n5p61",
  "cmmv7fbe10027qhxpr6dntgvn",
  "cmmv7fbdz0026qhxpr1iqui3y",
  "cmmv7fbdw0025qhxprt9vpcfz",
  "cmmv7fbdt0024qhxpj7t45zdb",
  "cmmv7fbdr0023qhxpddbiro1o",
  "cmmv7fbdo0022qhxpfgv9kr0u",
  "cmmv7fbdm0021qhxpkc8ciatb",
  "cmmv7fbdk0020qhxpjgub42c5",
  "cmmv7fbdh001zqhxpjefd11ym",
  "cmmv7fbdf001yqhxp0j59dxns",
  "cmmv7fbdd001xqhxps769kz12",
  "cmmv7fbdb001wqhxppmiebi8p",
  "cmmv7fbd8001vqhxpgphkgm3f",
  "cmmv7fbd4001uqhxpw6lt5r9d",
  "cmmv7fbd2001tqhxp8iajazuu",
  "cmmv7fbd0001sqhxpg5nsiiu3",
  "cmmv7fbcw001rqhxpwl1evasb",
  "cmmv7fbcu001qqhxpjdt98edt",
  "cmmv7fbcs001pqhxpsjsqm2b0",
  "cmmv7fbcq001oqhxpvsj11y0k",
  "cmmv7fbcn001nqhxppcu795ob",
  "cmmv7fbcl001mqhxpp3eysqgd",
  "cmmv7fbcj001lqhxpsdxtg1nm",
  "cmmv7fbcg001kqhxpt8janebn",
  "cmmv7fbca001jqhxp7u361ut1",
  "cmmv7fbc7001iqhxp90yuwhu7",
  "cmmv7fbc5001hqhxp27f0laq5",
  "cmmv7fbc3001gqhxpasz62rt9",
  "cmmv7fbc0001fqhxpx2fk52ze",
  "cmmv7fbbx001eqhxpv98p2hlk",
  "cmmv7fbbu001dqhxpb7c5k3ot",
  "cmmv7fbbo001cqhxpd6qr2sfv",
  "cmmv7fbbg001bqhxp1pxtghm4",
  "cmmv7fbbd001aqhxp1esmeu3p",
  "cmmv7fbbb0019qhxpshn3n93l",
  "cmmv7fbb90018qhxp2rwp4bjn",
  "cmmv7fbb60017qhxpbrct1rdt",
  "cmmv7fbb40016qhxpf07z6ns2",
  "cmmv7fbb00015qhxp58znio6g",
  "cmmv7fbax0014qhxpl01n3dol",
  "cmmv7fbav0013qhxpdjuyelvd",
  "cmmv7fbas0012qhxph3t7mzhy",
  "cmmv7fbap0011qhxpav1ea4dd",
  "cmmv7fban0010qhxp9qd4qvba",
  "cmmv7fbal000zqhxp1aznnj0l",
  "cmmv7fbai000yqhxp8rsyixd2",
  "cmmv7fbaf000xqhxp3l97hcde",
  "cmmv7fbad000wqhxpbanfihts",
  "cmmv7fba9000vqhxpow0n0a4f",
  "cmmv7fba7000uqhxpg9jmk0lh",
  "cmmv7fba4000tqhxpomrmv8az",
  "cmmv7fba1000sqhxpp73go0gn",
  "cmmv7fb9z000rqhxp6hbpm9tl",
  "cmmv7fb9w000qqhxphnvy2rh2",
  "cmmv7fb9u000pqhxpv2drpfqe",
  "cmmv7fb9r000oqhxpkjxqg0dn",
  "cmmv7fb9o000nqhxpxu361khd",
  "cmmv7fb9m000mqhxpb3lebnj3",
  "cmmv7fb9j000lqhxpn8cbz7ly",
  "cmmv7fb9h000kqhxplr0xu69b",
  "cmmv7fb9f000jqhxp5vhofo8t",
  "cmmv7fb9c000iqhxpyv9ckin7",
  "cmmv7fb9a000hqhxpnyv4gc47",
  "cmmv7fb97000gqhxpdpgwdrnm",
  "cmmv7fb95000fqhxpqnb980rq",
  "cmmv7fb92000eqhxpm34rvv2z",
  "cmmv7fb8z000dqhxp3hxdiym6",
  "cmmv7fb8w000cqhxp3v5zkanz",
  "cmmv7fb8q000bqhxp8sb4tk8b",
  "cmmv7fb8k000aqhxpvjorl2i6",
  "cmmv7fb8g0009qhxpf307zi2e",
  "cmmv7fb8a0008qhxpjpsqx8x0",
  "cmmv7fb860007qhxpy2x2quvf",
  "cmmv7fb830006qhxp31g5aaoi",
  "cmmv7fb7z0005qhxpg145j6qb",
  "cmmv7fb7v0004qhxp0qb71zba",
  "cmmv7fb7s0003qhxpxdljbjm8",
  "cmmv7fb7m0002qhxp1voehawm",
  "cmmv7fb7i0001qhxpq8ehb88z",
  "cmmv7fb6d0000qhxph0xtlyz6",
  "cmmv6gpbx002nqhfgxtp3mbm1",
  "cmmv6gpbu002mqhfgmipncvwj",
  "cmmv6gpbr002lqhfg7yp2xxma",
  "cmmv6gpbp002kqhfgtuppyjec",
  "cmmv6gpbn002jqhfgyykgoh9i",
  "cmmv6gpbl002iqhfgp16hl07i",
  "cmmv6gpbh002hqhfgq037dpmp",
  "cmmv6gpbf002gqhfgz69ny9pn",
  "cmmv6gpbc002fqhfg6k21aoa1",
  "cmmv6gpba002eqhfg23jdhccm",
  "cmmv6gpb8002dqhfgko2vc8u0",
  "cmmv6gpb5002cqhfgulkh0060",
  "cmmv6gpb3002bqhfggtzi17qd",
  "cmmv6gpb0002aqhfgub3zlz89",
  "cmmv6gpay0029qhfggel7qs9w",
  "cmmv6gpav0028qhfghq5dnuxh",
  "cmmv6gpat0027qhfgp78rhtgm",
  "cmmv6gpao0026qhfgt0xjs140",
  "cmmv6gpal0025qhfgg1gy6wfb",
  "cmmv6gpaj0024qhfgdgcinrgv",
  "cmmv6gpah0023qhfgvxy8eplo",
  "cmmv6gpae0022qhfgl19kagak",
  "cmmv6gpac0021qhfgonvwtjji",
  "cmmv6gpa90020qhfg6ml3twe3",
  "cmmv6gpa7001zqhfg5hm7yqs9",
  "cmmv6gpa5001yqhfgvrqusrh2",
  "cmmv6gpa2001xqhfgiad6muhw",
  "cmmv6gpa0001wqhfgf7dn3bxb",
  "cmmv6gp9x001vqhfgs8uywzjp",
  "cmmv6gp9v001uqhfgcnn1osv4",
  "cmmv6gp9t001tqhfgnuamoq86",
  "cmmv6gp9r001sqhfgb4119alw",
  "cmmv6gp9o001rqhfgv7r97ttb",
  "cmmv6gp9m001qqhfg65yp1vxt",
  "cmmv6gp9k001pqhfg21gpyj1p",
  "cmmv6gp9i001oqhfgpt2rawl1",
  "cmmv6gp9g001nqhfgflir3f6k",
  "cmmv6gp9e001mqhfghkiwygmx",
  "cmmv6gp9a001lqhfgz5k9sakd",
  "cmmv6gp98001kqhfg6z7sfgb3",
  "cmmv6gp96001jqhfg9bkzzoxq",
  "cmmv6gp94001iqhfg2bkuqk1r",
  "cmmv6gp92001hqhfgdqt2705d",
  "cmmv6gp90001gqhfg0b8a8oup",
  "cmmv6gp8x001fqhfgwhkyj8zk",
  "cmmv6gp8v001eqhfghepi8wgp",
  "cmmv6gp8t001dqhfget9pknnk",
];

async function deleteOldExercises() {
  console.log(`🗑️  Deleting ${idsToDelete.length} old exercises...`);

  // 1. ExerciseUsage
  const r1 = await prisma.exerciseUsage.deleteMany({
    where: { exerciseId: { in: idsToDelete } },
  });
  console.log(`  ExerciseUsage: ${r1.count}`);

  // 2. SpacedRepetition
  const r2 = await prisma.spacedRepetition.deleteMany({
    where: { exerciseId: { in: idsToDelete } },
  });
  console.log(`  SpacedRepetition: ${r2.count}`);

  // 3. Submission -> Assessment (assessment zależy od submission)
  const submissions = await prisma.submission.findMany({
    where: { exerciseId: { in: idsToDelete } },
    select: { id: true },
  });
  const subIds = submissions.map((s) => s.id);
  const r3a = await prisma.assessment.deleteMany({
    where: { submissionId: { in: subIds } },
  });
  console.log(`  Assessment: ${r3a.count}`);
  const r3 = await prisma.submission.deleteMany({
    where: { exerciseId: { in: idsToDelete } },
  });
  console.log(`  Submission: ${r3.count}`);

  // 4. ExamQuestion
  const r4 = await prisma.examQuestion.deleteMany({
    where: { exerciseId: { in: idsToDelete } },
  });
  console.log(`  ExamQuestion: ${r4.count}`);

  // 5. AiUsage
  const r5 = await prisma.aiUsage.deleteMany({
    where: { exerciseId: { in: idsToDelete } },
  });
  console.log(`  AiUsage: ${r5.count}`);

  // 6. Teraz usuń same Exercise
  const result = await prisma.exercise.deleteMany({
    where: { id: { in: idsToDelete } },
  });
  console.log(`\n✅ Deleted ${result.count} exercises.`);
}

deleteOldExercises()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
