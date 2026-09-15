export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Short label used by the filter on /projects. */
  group: string;
  headline: string;
  oneLine: string;
  result: { value: string; label: string };
  stack: string[];
  repo: string;
  /** Live demo, once deployed. Shown wherever the repository link is. */
  live?: string;
  image: string;
  extraImage?: { src: string; alt: string };
  problem: string;
  approach: string[];
  numbers: { label: string; value: string }[];
  decision: { title: string; body: string };
  limits: string[];
};

export const projects: Project[] = [
  {
    slug: "sentinel",
    name: "Sentinel",
    category: "Tabular machine learning",
    group: "Machine learning",
    headline: "Fraud scoring you can interrogate",
    oneLine:
      "A gradient-boosted classifier trained on 284,807 real card transactions, served over an API, with the features that drove every score.",
    result: { value: "79 of 98", label: "frauds caught with 12 false alarms across 56,864 legitimate transactions" },
    stack: ["scikit-learn", "MLflow", "FastAPI", "Docker", "Next.js"],
    repo: "https://github.com/direenvy/sentinel",
    live: "https://sentinel-n3m9.vercel.app",
    image: "/projects/sentinel.png",
    extraImage: { src: "/projects/sentinel-performance.png", alt: "Sentinel model card: PR-AUC 0.866, ROC-AUC 0.970, the precision-recall curve with the operating point marked, the confusion matrix and the candidate leaderboard" },
    problem:
      "Card fraud is 0.173% of transactions in the ULB dataset — 492 frauds among 284,807. At that imbalance the flattering metric (ROC-AUC) hides the cost of false alarms, and the reflex fix (class re-weighting) quietly breaks the model's ability to rank its own predictions.",
    approach: [
      "Three candidates compared on a held-out validation split by PR-AUC, the metric that survives the imbalance: logistic regression (balanced) 0.675, gradient boosting (balanced) 0.708, gradient boosting 0.808.",
      "Decision threshold tuned on validation (0.195), then reported once on an untouched test split of 56,962 transactions.",
      "Every score is explained by ablation — each feature replaced by its training median, the change in fraud probability recorded — and the API returns the explanation with the score.",
      "FastAPI endpoint; Next.js interface that scores transactions the model has never seen and plots the full precision–recall curve so the threshold is a visible dial.",
      "Reproducible by construction: one seed, every run tracked in MLflow, and a CI job that retrains from scratch on every push and fails the build if PR-AUC drops below 0.85 or drifts more than 0.01 from the committed model. Retraining reproduced the committed artefacts byte for byte.",
    ],
    numbers: [
      { label: "PR-AUC, test split", value: "0.866" },
      { label: "ROC-AUC", value: "0.970" },
      { label: "Precision / recall at 0.195", value: "0.868 / 0.806" },
      { label: "Frauds caught", value: "79 of 98" },
      { label: "False alarms", value: "12 of 56,864" },
    ],
    decision: {
      title: "Class weighting made the model worse, so it was dropped",
      body: "class_weight=\"balanced\" is the reflex move at a 578:1 imbalance, and it cost a tenth of a point of PR-AUC (0.708 against 0.808). Re-weighting that hard saturates the top of the score range and ties most frauds at the same probability, so the model loses the ability to rank its own top predictions — recall could not even be driven below 0.72. Tuning a threshold on unweighted probabilities does the same job without destroying the ranking. Both variants stay on the leaderboard because the comparison is the point.",
    },
    limits: [
      "The dataset's 28 anonymised PCA features cannot be named, so explanations say which component moved the score, not what it means.",
      "One dataset, one two-day window of European card transactions in 2013; the numbers do not transfer to another issuer without retraining.",
      "The threshold is tuned for F1, which implicitly prices a missed fraud and a blocked customer equally; a bank would set it from its own costs, and the app shows what moving it buys.",
      "Ablation attributes to one feature at a time, so it under-reports signal that is spread across interacting features.",
    ],
  },
  {
    slug: "sitewatch",
    name: "Sitewatch",
    category: "Computer vision",
    group: "Computer vision",
    headline: "Spot the head without a hard hat",
    oneLine:
      "A YOLO11n detector fine-tuned on 19,745 construction-site photos, with the confidence threshold tuned for the error that actually costs something: a missed violation.",
    result: { value: "905 of 1,038", label: "unprotected heads caught on the test split, at mAP50 0.907" },
    stack: ["Ultralytics YOLO11", "PyTorch", "FastAPI", "Next.js"],
    repo: "https://github.com/direenvy/sitewatch",
    image: "/projects/sitewatch.png",
    extraImage: { src: "/projects/sitewatch-performance.png", alt: "Sitewatch model card: the precision-recall curve for unprotected-head detection with the operating point marked, and what each confidence threshold costs" },
    problem:
      "A safety system is not judged on mean average precision. It is judged on how many people working without a hard hat it failed to flag — and an average over both classes lets good performance on compliant workers paper over missed violations.",
    approach: [
      "19,745 images and 55,393 boxes (Roboflow hard-hat dataset, CC BY 4.0), converted from COCO to YOLO format with an integrity check; 13,782 / 3,962 / 2,001 split.",
      "YOLO11n fine-tuned from COCO weights on a 6 GB laptop GPU at 512px for 12 epochs.",
      "A custom evaluator matches detections to ground truth by IoU and sweeps every confidence threshold, so the operating point is chosen by F1 on the no-hardhat class alone.",
      "FastAPI detection endpoint; Next.js interface with an SVG box overlay, a live threshold slider and a strip of held-out test images.",
    ],
    numbers: [
      { label: "mAP50, test split", value: "0.907" },
      { label: "mAP50-95", value: "0.550" },
      { label: "AP50, no-hardhat class", value: "0.898" },
      { label: "Violations caught at 0.35", value: "905 of 1,038" },
      { label: "Missed / false alarms", value: "133 / 140" },
    ],
    decision: {
      title: "640px was supposed to beat 512px. It didn't.",
      body: "Small, distant heads are the hard case, so a higher input resolution should have helped. It did not: identical mAP50-95 to four decimal places, with 512px marginally ahead on the safety class at 64% of the compute. A measured negative result that contradicted the prediction — and the reason the shipped model is the cheaper one.",
    },
    limits: [
      "The only ungated dataset labels hard hats and bare heads. There are no vest labels, so this is hard-hat compliance, not full PPE.",
      "Detection is per frame. There is no tracking, so the same worker crossing a camera is counted every frame.",
      "The dataset is not uniformly construction — it includes crowd and street photos — and this is a demonstration, not a safety system.",
    ],
  },
  {
    slug: "trackside",
    name: "Trackside",
    category: "Data collection and analysis",
    group: "Data analysis",
    headline: "Does a rail station nearby raise property prices?",
    oneLine:
      "120,153 registered Klang Valley property transactions, 215 stations scraped from Wikipedia, 5,260 schemes geocoded, and a regression that holds neighbourhood, type, tenure, year, size and floor level fixed.",
    result: { value: "+12.9%", label: "for a landed home within 400 m of a station in Selangor, vs 1.2–2 km — and roughly zero in Kuala Lumpur" },
    stack: ["pandas", "statsmodels", "SciPy", "Nominatim", "Next.js"],
    repo: "https://github.com/direenvy/trackside",
    image: "/projects/trackside.png",
    extraImage: { src: "/projects/trackside-map.png", alt: "Map of every geocoded scheme across the Klang Valley coloured by price per square metre, with rail stations overlaid" },
    problem:
      "\"Near the LRT\" is a selling point in every listing. Whether the market actually pays for it — after you hold everything else about a home fixed — is a question that needs registered sale prices, station coordinates, and a way to put 120,000 transactions on a map.",
    approach: [
      "Stations: the Wikipedia list of Klang Valley rail stations scraped with a descriptive User-Agent, one request per second and a disk cache; coordinates from each article's geo microformat.",
      "Transactions: NAPIC's official Open Sales Data — pivot-shaped Excel exports, forward-filled, cleaned, and trimmed of the top and bottom half-percent of price per square metre.",
      "Geocoding: every scheme placed through OpenStreetMap's Nominatim at one request per second, after a normaliser expanded NAPIC's abbreviations (TMN, KG, KAW) — 88,469 transactions located.",
      "Analysis: nearest open station by k-d tree, haversine distance, then log price-per-square-metre on distance band with fixed effects for mukim, property type, tenure, year, floor level and size, robust standard errors, run separately by territory.",
    ],
    numbers: [
      { label: "Strata within 400 m, Selangor & Putrajaya", value: "+7.4% [+5.2, +9.6]" },
      { label: "Landed within 400 m, Selangor & Putrajaya", value: "+12.9% [+11.5, +14.3]" },
      { label: "Strata within 400 m, Kuala Lumpur", value: "+2.4% [−0.1, +5.0]" },
      { label: "Landed beyond 5 km, Selangor", value: "−7.8% [−8.8, −6.8]" },
      { label: "Transactions located", value: "88,469 of 120,153" },
    ],
    decision: {
      title: "The obvious data source was declined",
      body: "The plan was rental listings from Mudah.my. Its robots.txt permits crawling; its Terms of Use explicitly prohibit scraping. robots.txt is a technical courtesy and the terms are the agreement, so the project uses NAPIC's official registry of completed sales instead — and says so. Registered prices rather than asking rents turned out to be the better number anyway. The second finding: Kuala Lumpur alone gives the opposite raw answer, because its rail was threaded through older, cheaper corridors. Splitting by territory turned a muddled pooled number into a mechanism — the station premium is a suburban phenomenon.",
    },
    limits: [
      "Association, not causation. Stations were built where people already were; this measures what the market pays for proximity, not what a new station would do to prices.",
      "Geocoding resolves some schemes only to a road; dropping those leaves the strata premium at +3.6%, so the direction holds, but 26% of transactions could not be placed at all.",
      "The window includes a pandemic year; the 2022-onward robustness check exists for that reason.",
    ],
  },
  {
    slug: "kaunter",
    name: "Kaunter",
    category: "Retrieval-augmented answering",
    group: "Language",
    headline: "A Rapid KL help counter that shows its sources",
    oneLine:
      "Bilingual retrieval over 38 official Prasarana documents — measured on a hand-built question set before it was allowed to answer anything. Every sentence cited; every quote checked against its source.",
    result: { value: "98%", label: "of questions have the right chunk in the top five; 8 of 8 off-corpus questions declined" },
    stack: ["bge-m3", "bge-reranker-v2-m3", "Gemini", "FastAPI", "Next.js"],
    repo: "https://github.com/direenvy/kaunter",
    image: "/projects/kaunter.png",
    extraImage: { src: "/projects/kaunter-evaluation.png", alt: "Kaunter's evaluation section: every chunking strategy against every retriever, the cross-language recall chart, and end-to-end results through the model" },
    problem:
      "The retrieval half of my final-year project had never been measured. Half the corpus is Malay, half English; a fare question answered from the wrong station's row is worse than no answer; and a chatbot that cannot say \"I don't know\" will make something up.",
    approach: [
      "38 documents re-extracted properly: the two-column code of conduct read column-wise, Act page headers stripped, sections split where the heading precedes the number.",
      "Three chunking strategies and five retrievers — dense (bge-m3), BM25, hybrid, each with and without a cross-encoder reranker — evaluated on 119 hand-written questions with the answer phrase labelled in the source document.",
      "Exact fares answered from the official matrices by lookup, never by retrieval. Questions whose best chunk scores under 0.15 on the reranker are declined before the model is called.",
      "Gemini writes an evidence block of verbatim quotes before it answers; each quote is verified against the chunk it cites and shown with a verbatim / not-found flag.",
    ],
    numbers: [
      { label: "Recall@1 / Recall@5", value: "0.861 / 0.981" },
      { label: "Cross-language Recall@5", value: "0.92" },
      { label: "Answerable questions correct, end to end", value: "97.2%" },
      { label: "Quoted evidence found verbatim", value: "97.3% of 185" },
      { label: "Off-corpus questions declined", value: "8 of 8" },
    ],
    decision: {
      title: "Hybrid search had to earn its place, and didn't",
      body: "Keyword search finds the answer to a cross-language question 36% of the time; the multilingual embedding finds it 92% of the time. Fusing the two — hybrid search, the tutorial default — made plain dense retrieval worse (Recall@5 0.880 vs 0.972), because BM25 votes for the wrong chunks with confidence. The simpler pipeline was also the better one. And the first prompt refused five answerable questions whose answer was the top chunk's first sentence; asking the model to quote its evidence before answering cut that to two.",
    },
    limits: [
      "The corpus is a snapshot — pass prices as of December 2025, disruption notices from February to April 2026. Nothing is live.",
      "Embeddings represent what a chunk is about, not every fact in it; a name mentioned once in a press release on another subject is, for retrieval purposes, not there.",
      "119 questions written by the person who built the system is enough to rank configurations, not to quote recall to a second decimal place as if it generalised.",
    ],
  },
  {
    slug: "turnstile",
    name: "Turnstile",
    category: "Data engineering",
    group: "Data engineering",
    headline: "Ridership data, checked before it's published",
    oneLine:
      "A scheduled pipeline over data.gov.my's daily public-transport ridership file — 14 modes since 2019 — that keeps every snapshot, runs eleven data-quality checks, and publishes a dashboard only when they pass.",
    result: { value: "11 checks", label: "on every run; the first one found a retired bus service, a metro disruption and a line opening in the history" },
    stack: ["pandas", "DuckDB", "GitHub Actions", "Next.js"],
    repo: "https://github.com/direenvy/turnstile",
    live: "https://turnstile-tawny.vercel.app",
    image: "/projects/turnstile.png",
    extraImage: { src: "/projects/turnstile-quality.png", alt: "Turnstile's quality section: the eleven checks with their result, outliers by year, and the most recent outliers against their same-weekday baselines" },
    problem:
      "A dashboard is only as trustworthy as the last thing that checked its data. data.gov.my publishes daily ridership monthly, after audit; services open and close; a feed can silently go to zero. A pipeline that just fetches and plots would show all of that as fact.",
    approach: [
      "Ingest: fetch the parquet daily, hash it, and store it only if the bytes are new — a manifest of every distinct snapshot ever seen.",
      "Validate: eleven checks with severities. Errors (schema, duplicate or missing days, negatives, a shrunken snapshot) fail the run and publish nothing; warnings (freshness over 45 days, silent zeros, outliers) publish and stay visible on the page.",
      "Outliers are judged against the median of the same weekday over the previous eight weeks, because ridership drops 40% at weekends and a day-over-day rule would flag every Saturday.",
      "Transform: wide to long parquet, DuckDB for the aggregation, JSON marts committed next to a static Next.js dashboard that Vercel rebuilds on the data commit. The repository is the database and git log is the audit trail.",
    ],
    numbers: [
      { label: "Daily rows checked", value: "2,769 days × 14 modes" },
      { label: "Checks per run", value: "11" },
      { label: "Outliers found in history", value: "742, 629 of them the 2020–21 lockdowns" },
      { label: "MRT Putrajaya, 25 Oct 2025", value: "0.28× baseline" },
      { label: "Tests", value: "19" },
    ],
    decision: {
      title: "A flag becomes a recorded decision, not a special case",
      body: "On the first run the silent-zero check reported that Rapid Bus Kuantan had been at zero for 229 days and could not say whether the feed had broken or the buses had stopped. The answer — the service ended on 14 December 2025 — went into the config as a retirement date with a note. The check now reads that and downgrades the finding, the dashboard marks the mode retired, and the outlier rule stops judging it after that day. Nothing in the validation code knows the name of any mode. The same run found the MRT Putrajaya line at 19% of its normal Saturday on 25 October 2025, and thirty zero days before LRT Shah Alam opened — one a disruption to surface, the other an opening to leave alone.",
    },
    limits: [
      "The cadence is the publisher's: data.gov.my updates monthly, so most daily runs find nothing new and say so. The first run's data was 46 days old, which is the freshness check working on a slow source, not a fault.",
      "Trips, not passengers — an interchange counts twice, and every figure is labelled as a trip count.",
      "The outlier rule compares each day with the last eight weeks, so it is blind to slow drift; year-on-year on the mode cards covers that. It also cannot tell a holiday from a fault: Thaipusam and Chinese New Year appear in the list with the disruptions.",
      "Alerting is a failed GitHub Actions run and the email that follows; there is no pager, and nothing retries.",
    ],
  },
];

export type Supporting = {
  name: string;
  group: string;
  category: string;
  note: string;
  repo: string;
  live?: string;
  image: string;
  /** Screenshots are cropped; figures are shown whole on white. */
  fit: "cover" | "contain";
};

export const supporting: Supporting[] = [
  {
    name: "LRT Companion",
    group: "Agentic AI",
    category: "Final-year project",
    note: "An agentic system for Klang Valley rail disruptions: detection from commuter reports, disruption-aware rerouting, voice, and the retrieval work Kaunter grew out of.",
    repo: "https://github.com/direenvy/lrtcompanion",
    live: "https://lrtcompanionapp.vercel.app",
    image: "/projects/lrtcompanion.png",
    fit: "cover",
  },
  {
    name: "TXSA",
    group: "Language",
    category: "Coursework · Text and speech analytics",
    note: "Tokenisation, stemming, parsing and n-gram models, then four classifiers tuned and compared on a six-emotion text dataset.",
    repo: "https://github.com/direenvy/TXSA",
    image: "/projects/txsa.png",
    fit: "contain",
  },
  {
    name: "AI-Methods",
    group: "Machine learning",
    category: "Coursework · Optimisation",
    note: "Particle swarm optimisation from scratch: a swarm of candidate solutions moving over an objective surface without computing a gradient.",
    repo: "https://github.com/direenvy/AI-Methods",
    image: "/projects/ai-methods.png",
    fit: "contain",
  },
];

export const stats = [
  { value: "284,807", label: "card transactions scored" },
  { value: "19,745", label: "site photos the detector learned from" },
  { value: "120,153", label: "property sales placed on a map" },
  { value: "119", label: "hand-labelled questions before a model answered one" },
  { value: "11", label: "checks a ridership feed passes before it is published" },
];
