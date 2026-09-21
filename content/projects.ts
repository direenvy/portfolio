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
      "Outliers are judged against the median of the same weekday over the previous eight weeks, because ridership drops by a quarter to a third at weekends and a day-over-day rule would flag every Saturday.",
      "Transform: wide to long parquet, DuckDB for the aggregation, JSON marts committed next to a static Next.js dashboard that Vercel rebuilds on the data commit. The repository is the database and git log is the audit trail.",
      "Read afterwards as a control environment: a risk-and-controls matrix (docs/RACM.md, and /controls on the site) sets out eleven objectives — completeness, accuracy, timeliness, provenance, the publication gate, operation, change management, access, reproducibility, judgement, licence — with the risk, the control, its evidence, the test and the result against the repository. Eight effective; three gaps: the unprotected default branch Gatekeeper found, no monitor outside GitHub for a stopped schedule, and a publication gate proven only on synthetic data.",
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
  {
    slug: "headway",
    name: "Headway",
    category: "Time series",
    group: "Forecasting",
    headline: "Fourteen days of ridership, forecast and scored honestly",
    oneLine:
      "A 14-day forecast for every rail and bus line in Turnstile's checked data — twelve lines, 260,000 trips a day down to 3,000 — backtested over 52 weeks against the seasonal naive, and taken apart by kind of day to show where it wins and where nothing does.",
    result: { value: "MASE 0.77", label: "against 1.30 for copying last week; the calendar accounts for most of the gap, and the disruption days for the rest" },
    stack: ["LightGBM", "statsmodels", "holidays", "GitHub Actions", "Next.js"],
    repo: "https://github.com/direenvy/headway",
    live: "https://headway-eta.vercel.app",
    image: "/projects/headway.png",
    extraImage: { src: "/projects/headway-loses.png", alt: "Headway's 'Where it loses' section: error by kind of day for three models, the twelve worst days with the reason where the calendar has one, and a browser over every backtest window" },
    problem:
      "A forecast is easy to make and easy to flatter. The question is whether it beats the thing a planner already does — assume next Tuesday looks like last Tuesday — and on which days it doesn't. Ridership has a strong weekly cycle, public holidays that move with the lunar calendar, and disruptions that no history predicts.",
    approach: [
      "Rolling-origin backtest: 26 origins, one every fourteen days over the last 52 weeks. Every model sees only what it could have seen and forecasts the next fourteen days; 4,368 scored days per model.",
      "Three baselines — seasonal naive, the four-week weekday mean, Holt-Winters ETS — against one global LightGBM over all twelve lines, trained on log ratios to a 28-day level so a 190,000-trip line and a 3,000-trip one share a model. Same-weekday lags chosen per horizon, plus each line's own state public-holiday calendar.",
      "MASE as the headline: error relative to the in-sample seasonal naive, so 1.00 means 'no better than last week' and lines of any size compare. WAPE alongside because it is the number a planner would quote.",
      "Every scored day labelled — weekday, weekend, holiday, holiday-adjacent, flagged by Turnstile's outlier rule — and the error reported per label. The dashboard's 80% band is the backtest's own error quantiles at each horizon, not a formula's.",
    ],
    numbers: [
      { label: "LightGBM · MASE", value: "0.77 · WAPE 5.0%" },
      { label: "Seasonal naive · MASE", value: "1.30 · WAPE 9.7%" },
      { label: "Beats the naive on", value: "12 of 12 lines" },
      { label: "Holiday error, with vs without the calendar", value: "11.5% vs 50.0%" },
      { label: "Worst day", value: "231% off, a flagged disruption" },
    ],
    decision: {
      title: "The calendar is most of the model",
      body: "Remove the public-holiday features and LightGBM's MASE goes from 0.77 to 0.98 — from a clear win over the naive to roughly the weekday mean. The whole difference sits on 271 holiday days out of 4,368: 11.5% error with the calendar, 50% without, which is the same 50% the naive gets, because a model that does not know Thursday is Hari Raya predicts a Thursday. ETS, which has no calendar either, is the best model at one day ahead (0.63 to LightGBM's 0.66) and loses every day after. And the worst miss of all — MRT Putrajaya at 32,971 trips on a Saturday forecast at 109,105 — is the disruption Turnstile's outlier rule flagged; the sixteen flagged days sit at 95% error for every model, and the page says so rather than hiding them in an average.",
    },
    limits: [
      "Every origin is a Friday, so horizon 1 is always a Saturday: the error-by-horizon chart is partly an error-by-weekday chart.",
      "Public holidays only. School holidays, Ramadan and bridging days are not in the calendar; the 10.8% error on holiday-adjacent days is where they show.",
      "Disruptions, fare changes and new stations are invisible to a model of ridership history. Seven of the twelve worst days are KTM Intercity, at 3,000 trips a day the smallest service, where a few hundred trips is a large percentage and nothing in the calendar explains them.",
      "One 80% band per horizon, pooled across lines: right on average, too narrow for the small services and too wide for the large ones.",
    ],
  },
  {
    slug: "gatekeeper",
    name: "Gatekeeper",
    category: "IT audit",
    group: "IT audit",
    headline: "Change-management controls, tested on real repositories",
    oneLine:
      "An IT audit of change management over the default branch of fifteen GitHub repositories — seven of mine, eight well-known open-source projects: a 12,117-change population, a 461-item attribute sample, four controls mapped to COBIT, ISO 27001 and SOX, a workpaper per repository and a findings memo. The first finding is against the auditor.",
    result: { value: "41%", label: "of sampled changes met all three change controls; three of fifteen default branches enforce the gate" },
    stack: ["GitHub REST API", "git", "pandas", "SciPy", "Next.js"],
    repo: "https://github.com/direenvy/gatekeeper",
    live: "https://gatekeeper-nine-woad.vercel.app",
    image: "/projects/gatekeeper.png",
    extraImage: { src: "/projects/gatekeeper-results.png", alt: "Gatekeeper's results by repository, the findings with risk ratings, and a workpaper with every item tested" },
    problem:
      "Change management is the IT general control every audit tests: was the change requested, reviewed by someone else, tested, and is that enforced rather than habitual? GitHub holds the evidence for all four, publicly, for every project on it. So the question can be answered properly — population, sample, test, workpaper — instead of with a questionnaire.",
    approach: [
      "Population: every first-parent commit on the default branch in twelve months, from a blob-less clone of each repository, so a squash, a merge commit and a direct push each count once. 12,117 changes.",
      "Attribute sampling as the profession does it: 5% tolerable deviation, 0% expected, 95% confidence gives 59 items per repository; stratified, drawn without replacement with a recorded seed, small populations examined in full. One-sided Clopper–Pearson upper bounds on every rate.",
      "Four controls, one test each, on the API's own evidence: the commit's associated pull request (C1), an APPROVED review before merge by a non-author (C2), every pre-merge check run passing (C3), and the branch's public rules (C4). Every response cached at fieldwork so the tests re-perform on the same bytes.",
      "Deliverables an audit reviewer expects: a workpaper per repository with objective, population, sample, results and every item; an exceptions register; a findings memo with risk ratings and remediation; and a dashboard that browses all of it.",
    ],
    numbers: [
      { label: "Population", value: "12,117 changes, 15 repositories" },
      { label: "Sample", value: "461 items, 59 per repository" },
      { label: "Met all three change controls", value: "41%" },
      { label: "Branches enforcing PR + checks", value: "3 of 15" },
      { label: "Ratings", value: "9 High · 5 Medium · 1 Low" },
    ],
    decision: {
      title: "The first finding is the auditor's",
      body: "None of my seven repositories had a protected default branch, and all 41 changes in the period were pushed straight to it — 40 by me, one by my own pipeline bot. It would have been easy to leave them out of scope or fix them before fieldwork; an audit that does either is not one. The open-source set was more interesting than expected: Flask's branch is protected in name only and 34 of 45 changes were the lead maintainer committing directly; FastAPI has the full ruleset and the lead maintainer bypassed it four times in 59; pandas shows no public rules at all yet had zero direct pushes. The settings would have ranked them wrongly in every direction, which is why the audit tests the changes. The tests themselves had to be refined against the evidence — post-merge cleanup jobs are not a gate, a cancelled run is not a failed test, a merge queue evaluates a commit the API never shows — and the README records each refinement, because a test that was tuned after seeing the results has to say so.",
    },
    limits: [
      "Classic branch-protection settings are visible only to admins, so for repositories without rulesets the branch control rests on the protected flag alone.",
      "C3 is stricter than GitHub's own required-checks logic: any pre-merge check that did not pass counts, including checks the project does not require. The workpaper names the check so a reader can judge.",
      "Evidence is as of fieldwork; reviews dismissed or checks re-run afterwards would change what is observed. The cache preserves what was seen but is not committed (95 MB).",
      "The open-source projects were not consulted. This is a test of public evidence against a generic control standard, not a judgement about their software; several deliberately trade formal approval for maintainer trust.",
    ],
  },
  {
    slug: "basket",
    name: "Basket",
    category: "Business intelligence",
    group: "Business intelligence",
    headline: "Where the cost of living is rising, and in what",
    oneLine:
      "A Power BI model of Malaysia's Consumer Price Index — every month since 2010, every state, the full MCOICOP basket down to 101 classes — as a star schema with a marked date table, nineteen DAX measures, and a file of expected values computed independently so the model could be checked while it was built.",
    result: { value: "1.9%", label: "headline inflation in August 2026 — but 2.6% in Negeri Sembilan and 0.5% in Sarawak, and food 3.5% in Johor against −0.1% in Kelantan" },
    stack: ["Power BI", "DAX", "pandas", "data.gov.my"],
    repo: "https://github.com/direenvy/basket",
    image: "/projects/basket.png",
    extraImage: { src: "/projects/basket-pages.png", alt: "Basket's four pages: Overview, By state, What got expensive, Explorer" },
    problem:
      "A national inflation print is one number for a country where prices move differently by state and by what you buy. A retail pricing team or a household-budget officer needs the rate for their state and their basket, for the latest month, against the national figure — and needs to trust the number. Power BI is the tool such teams have; the question is whether the model behind the report is right.",
    approach: [
      "Four DOSM datasets (CPI by division, group and class nationally; by state × division) and the MCOICOP lookup, fetched and shaped in pandas into a star schema: FactCPI at one grain (month × state × category, 76,456 rows), DimDate, DimGeography, DimCategory with the ragged hierarchy carried honestly — a Level column and the parents' names on every row, because state data stops at divisions and class data is national only.",
      "Nineteen DAX measures: the index, year on year, month on month, three-month annualised pace, change since December 2019, the gap to the national rate and to the headline in percentage points, ranks, and a title measure. Time intelligence over a marked date table; the pre-pandemic base is a flag on the date table, not a hard-coded date in every measure.",
      "Expected values first. The build script computes the headline, every division's YoY, every state's overall and food YoY, and the classes that rose and fell most since December 2019, and writes them to expected.json. The report was built against them, so a relationship the wrong way round or an unmarked date table showed up as a wrong number rather than a plausible one.",
      "Four pages: the headline and the divisions; states ranked with the gap to the national rate; the ten classes that rose most and the ten that fell, with a division › group › class matrix; and an explorer that overlays any states for any of 162 categories.",
    ],
    numbers: [
      { label: "Headline, Aug 2026", value: "1.93% YoY · 0.29% MoM" },
      { label: "Since Dec 2019", value: "+12.4%" },
      { label: "State spread", value: "2.6% N. Sembilan · 0.5% Sarawak" },
      { label: "Food", value: "3.5% Johor · −0.1% Kelantan" },
      { label: "Biggest rise since 2019", value: "Jewellery +132%" },
      { label: "Model", value: "76,456 facts · 3 dimensions · 19 measures" },
    ],
    decision: {
      title: "A division has its own index, and the average of its classes is not it",
      body: "The class matrix nests classes under groups under divisions, and Power BI will happily put a number on the division row — the average of the class indices. For Alcoholic Beverages & Tobacco that average is 2.2%; the division's own rate, a separate row in DOSM's data, is 2.8%. The index is never summed or averaged across categories, so the matrix shows nothing on the parent rows and the Overview chart reads the division rows directly. The same discipline caught two other quiet errors: a state rank that came out as 1 for every state, because the State column's sort-by column was silently part of every row's filter; and a monthly date table that Power BI refused to mark as a date table, which is why DimDate is daily with the facts on the first of each month.",
    },
    limits: [
      "State detail stops at divisions, so which class is driving Johor's food inflation cannot be answered from this data; the class view is national.",
      "No basket weights are published with these series, so the report shows each division's own rate, not its contribution to the headline.",
      "An index says how fast prices move, not what they are; Sarawak's low inflation does not mean Sarawak is cheap.",
      "Power BI Service needs a work or school account to publish; the deliverable is the committed .pbix and the page screenshots until a published link exists.",
    ],
  },
  {
    slug: "farebox",
    name: "Farebox",
    category: "SQL analysis",
    group: "Data analysis",
    headline: "Six questions an operator would ask, answered in SQL",
    oneLine:
      "A DuckDB warehouse of seven and a half years of daily ridership for fourteen Malaysian rail and bus lines, weekly fuel prices and public holidays by state; twenty-three queries, each one a decision about capacity, timetables, possessions or contingency; a memo with three recommendations; and tests that recompute the headline numbers in pandas.",
    result: { value: "5%", label: "of a 170,000-trip daily shortfall was absorbed by other lines when the LRT Kelana Jaya line was suspended in November 2022 — the interchange lines fell with it" },
    stack: ["DuckDB", "SQL", "pandas", "pytest", "Next.js"],
    repo: "https://github.com/direenvy/farebox",
    live: "https://farebox.vercel.app",
    image: "/projects/farebox.png",
    extraImage: { src: "/projects/farebox-episodes.png", alt: "Farebox: the gaps-and-islands query that groups disrupted days into episodes, with its SQL and the resulting table" },
    problem:
      "Turnstile publishes a checked daily count for every line; Headway forecasts it. Neither answers the questions an operator actually has: where to put the next train set, whether Friday still needs a full timetable, when to book the track possession, how much bus-bridging to buy when a line fails, and whether a fuel-price rise fills the trains. Those are SQL questions — joins across calendars and prices, windows over time — and the answer to each is a decision, not a chart.",
    approach: [
      "A warehouse, not a notebook: ridership, a mode register with each line's holiday catchment and opening date, holidays per state, festivals, weekly fuel prices, and the pandemic regime, in DuckDB; a day view that attaches the calendar, and a baseline view — the median of the previous eight same weekdays as a window over PARTITION BY mode, dow — so a holiday, an outage and a festival are all read as one ratio.",
      "Six questions in six files, twenty-three named queries with a note on the technique: LAG and FIRST_VALUE for year on year, SUM() OVER () for contributions, a self-join on date − 364 to keep weekdays aligned, conditional aggregation to pivot weekdays and festivals, before/after windows with a control line, gaps-and-islands to turn disrupted days into episodes, a correlated subquery for the first normal day after, an ASOF JOIN for the fuel price in force, and corr/regr_slope over three windows to show an elasticity that is not stable.",
      "Cross-checks instead of trust: thirteen tests recompute the LRT's last-quarter YoY, MRT Kajang's weekday index, the holiday ratio, the Kelana Jaya suspension episode and the baseline itself in pandas from the CSV, without DuckDB, and assert that contributions sum to the network figure.",
      "A one-page memo with three recommendations, and a site that shows every query with its SQL and its result, so a reader can check the reasoning rather than the conclusion.",
    ],
    numbers: [
      { label: "Warehouse", value: "27,007 line-days · 14 lines · 2019 → Aug 2026" },
      { label: "Queries", value: "23 in 6 questions" },
      { label: "Absorbed in the Nov 2022 suspension", value: "5% of ~170,000 trips a day" },
      { label: "MRT Putrajaya full opening", value: "+87,000 weekday trips, +10.7% network" },
      { label: "Weekday holiday", value: "LRT 53% · KTM Intercity 2.2×" },
      { label: "RON95 step, Sep 2025", value: "no rise; growth −1 to −4 pp" },
    ],
    decision: {
      title: "The fuel result is published because it is unstable",
      body: "The textbook says dearer petrol fills the trains, and Malaysia offered two natural experiments: RON97 floats weekly, and RON95 stepped from RM2.05 to RM2.60 for unsubsidised drivers on 30 September 2025. The step was followed by lower year-on-year growth on every Klang Valley line but one. The weekly RON97 regression, detrended with year-on-year changes on both sides, gives a negative elasticity — and −0.39, −0.18 or −0.12 depending on whether it starts in 2023, 2024 or 2025. A single window would have produced a confident, wrong number. The query reports all three, and the memo says what it means: a trend artefact, not an elasticity, and not a lever the operator should plan on. The same discipline shaped the rest — the LRT Shah Alam feed carries zeros for three months before its first real count, Rapid Bus Kuantan reports zeros after it closed, a declared holiday for the ASEAN Summit is missing from the holidays package, and the CNY tail runs past three days; each was found because a result looked wrong, and each is encoded in the warehouse rather than patched in a query.",
    },
    limits: [
      "A trip is a boarding on one line; a journey with a transfer is two trips, and the transfer rate is not in the data.",
      "Disruptions are inferred from the counts and have no recorded cause. The November 2022 Kelana Jaya suspension is public record; most episodes on KTM Intercity, at 3,000 trips a day, are the noise of a small service.",
      "The before/after tests use one control line and eight-week windows: honest comparisons, not causal estimates.",
      "No fares, revenue or costs. Farebox is what the counts imply for the farebox, not the farebox itself.",
    ],
  },
  {
    slug: "sentry",
    name: "Sentry",
    category: "IT audit",
    group: "IT audit",
    headline: "Logical access and segregation of duties, tested against an answer key",
    oneLine:
      "An IT audit of user access on four systems of a fictional company — 1,204 employees, 1,896 accounts, a year of grants and expense claims — generated from a seed with 195 control failures recorded. Seven access controls and fraud analytics tested over the full population, every exception registered, the controls rated, a findings memo, and the tests scored: 195 of 195 found, nothing else flagged.",
    result: { value: "33 of 44", label: "segregation-of-duties conflicts were in the role model itself — a design deficiency the generator never planted, found by the test and added to the ground truth" },
    stack: ["pandas", "NumPy", "pytest", "Next.js"],
    repo: "https://github.com/direenvy/sentry",
    live: "https://sentry-ruddy.vercel.app",
    image: "/projects/sentry.png",
    extraImage: { src: "/projects/sentry-findings.png", alt: "Sentry's findings: leaver de-provisioning, roles designed with an SoD conflict, unapproved grants, generic privileged accounts, orphan accounts, access accumulating across moves" },
    problem:
      "Logical access is the other half of the IT general controls Gatekeeper left untested: joiners, leavers, movers, privileged accounts, dormancy, authorised changes and segregation of duties. Real identity-and-access extracts are never public, so a synthetic one is the only honest option — and it comes with something a real audit never has: the answer key. If the generator records every failure it plants, the tests can be scored on what they find and what they flag that was not there.",
    approach: [
      "A seeded generator builds a clean population first — an HR master with hires, leavers and movers; personal, service and generic accounts on ERP, HRIS, payroll and AD; entitlements from a role-based access model; an access-change log with tickets and approvers; an exceptions register; 10,971 log-normal expense claims — then plants 149 failures and writes each to injected.json.",
      "Seven full-population tests, one per control, mapped to COBIT DSS05.04 / DSS06.03, ISO 27001 A.5.3 / 5.15 / 5.16 / 5.18 / 8.2 and the SOX logical-access objectives: accounts without an employee, leavers not disabled by the next business day, entitlements outside the role model without an approved exception, privileged access on generic accounts or wrong roles, dormancy over 90 days, grants without an approved ticket or approved by the beneficiary or requester, and twelve SoD rules across systems.",
      "Fraud analytics on the claims: Benford's law by department with Nigrini's mean absolute deviation, claims just under the RM1,000 approval limit per claimant, duplicates, self-approval, round amounts.",
      "Ratings (High above a 5% tolerable rate or three High-severity exposures; Medium; Low), an exceptions register of 195 items with the ground-truth kind each matched, a findings memo with root causes and recommendations, and a scoring table. pytest checks that the generator is byte-for-byte deterministic and that every test finds exactly its ground truth; CI regenerates and fails on drift.",
    ],
    numbers: [
      { label: "Population", value: "1,896 accounts · 2,681 entitlements · 217 grants · 10,971 claims" },
      { label: "Exceptions", value: "195, full population" },
      { label: "Ratings", value: "5 High · 2 Medium" },
      { label: "Leavers still enabled", value: "8 of 120, up to 268 days" },
      { label: "SoD conflicts by design", value: "33 of 44, in three roles" },
      { label: "Tests scored", value: "195 of 195 found, 0 extra" },
    ],
    decision: {
      title: "The tests found failures nobody planted, and the ground truth was extended rather than the model fixed",
      body: "The first scoring run showed the SoD test flagging 44 conflicts against 10 planted. The extra 34 were not a bug: the role model I had written for the fictional company gave Treasury Officers payment run and bank reconciliation, AP Supervisors invoice entry and approval, Payroll Managers payroll approval and bank-file release. That is exactly what a real SoD review finds — a design deficiency, where the remediation is to split roles rather than to fix individuals — and it is a better finding than any of the planted ones. The easy move was to edit the roles so the score came out clean. Instead the ground truth gained a second kind, design, and later two more: process, for the four grants the workflow let the ERP owner approve to his own account, and consequence, for a still-enabled leaver's account being dormant too and a mover's kept HR rights conflicting with the payroll run he now performs. The scoring table separates the kinds so the reader can see which failures were planted and which the tests found on their own. On the analytics side, χ² was demoted to a secondary statistic after it declared Operations' 5,543 claims nonconforming on an immaterial deviation — a sample-size artefact Nigrini's MAD does not have.",
    },
    limits: [
      "The company is fictional and the failure rates were chosen, so the ratings describe the tests' behaviour on this data, not any real organisation's control environment.",
      "The tests assume clean identifiers — one employee ID joins HR to every system. Real extracts need an identity-matching step first, and that is where real audits spend their time.",
      "An exceptions-register entry is taken as a valid mitigating control; a real audit tests whether the mitigation operates.",
      "The clean claims are log-normal by construction, so their Benford conformity is partly built in; the Sales result is the test working on the part that was not.",
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
  { value: "0.77", label: "MASE on a 14-day forecast, against 1.30 for copying last week" },
];
