# برنامه کامل Study Tracker

> تولیدشده در 2026-09-01 از داده‌های واقعی `app/plan-data.ts`، نسخه برنامه 11.
> متن اصلی فعالیت‌ها به زبان آلمانی حفظ شده است تا با برنامه داخل اپلیکیشن دقیقاً یکسان بماند.

این فایل نسخه قابل‌خواندن و قابل‌چاپ برنامه داخل Study Tracker است. علامت‌زدن چک‌باکس‌های این فایل، وضعیت داخل اپلیکیشن را تغییر نمی‌دهد؛ برای همگام‌سازی پیشرفت باید از خود اپلیکیشن استفاده شود.

## خلاصه برنامه

| مورد | مقدار |
| --- | ---: |
| نسخه برنامه | 11 |
| شروع برنامه | 2026-08-30 |
| پایان برنامه | 2027-05-27 |
| تعداد هفته‌ها | 37 |
| تعداد روزهای برنامه‌ریزی‌شده | 185 |
| تعداد ریزفعالیت‌ها | 1665 |
| مقاله‌های برنامه‌ریزی‌شده | 18 |
| زمان هر مقاله | 16 ساعت |
| کل زمان مقاله‌ها | 288 ساعت |
| ظرفیت هفتگی | 40 ساعت |
| کل زمان برنامه | 1480 ساعت |
| پایان فاز طراحی | 2026-11-05 |
| شروع فاز فنی | 2026-11-06 |

## قانون اجرای روزانه

1. فقط کوچک‌ترین واحد معنادار همان روز را بخوانید و بعد از فهم آن توقف کنید.
2. خروجی روز باید سه جزء قابل‌ردیابی داشته باشد: **Artefakt + Test + Evidence**.
3. یادداشت روزانه در Tracker حداکثر سه خط است؛ هایلایت، شماره صفحه و ارجاع منبع در Zotero باقی می‌ماند.
4. کارهای عقب‌افتاده فشرده یا دوبرابر نمی‌شوند و محدودیت پزشکی همیشه بر برنامه اولویت دارد.
5. Study Tracker سطح برنامه‌ریزی و کنترل پیشرفت است؛ وجود کارت‌های Roslyn، Neo4j یا Cypher به‌تنهایی اثبات پیاده‌سازی علمی پایان‌نامه نیست.

## برنامه خواندن مقاله‌ها

### 01. [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)

- **شناسه:** `reading-06`
- **فایل:** `C01-O06_DEEP_Read-MultiRepo-Graph-Eval_★★★★★_CORE_R09_Usai_2026_LogicLens_Multi_Repository_Semantic_Code_Graph__DEEP_Read-MultiRepository-Graph-Evaluation (2).pdf`
- **حالت مطالعه:** DEEP — Vollständig lesen
- **وضعیت اولیه در برنامه:** in_progress
- **جلسه‌های مرتبط:** 8, 9, 10
- **بخش‌های الزامی:** Gesamter Artikel – vom Abstract bis zur Conclusion einschließlich Evaluation und Limitations
- **تمرکز:** Semantic code graph and cross-repository links؛ Provenance and evaluation design؛ Differences from Evidence Record and Evidence Path
- **ارتباط با پروژه:** RQ1/RQ2: compare LogicLens multi-repository graphs and provenance with the thesis Evidence Record, Evidence Path, and answerability boundary.

### 02. [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782)

- **شناسه:** `reading-07`
- **فایل:** `C02-O07_TARGET_Read-Data-Metrics-Threats_★★★★☆_IMPORTANT_R43_Cheng_2024_DraCo_Dataflow_Guided_Repository_Retrieval__TARGET_Read-Method-Evaluation-Limitations.pdf`
- **حالت مطالعه:** TARGET — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 1, 2, 8, 10
- **بخش‌های الزامی:** Abstract؛ Method / Approach؛ Data / Evaluation؛ Results؛ Limitations / Threats
- **تمرکز:** Data-flow-aware token and context selection؛ Retrieval method and metrics؛ Threats and repository-level limits
- **ارتباط با پروژه:** RQ2: supplies a data-flow-guided retrieval comparison point and clarifies which structural signals belong in Graph rather than Flat Retrieval.

### 03. Gandhi et al. 2025: Repository-Level Code Search

- **شناسه:** `reading-08`
- **فایل:** `C03-O08_TARGET_Read-Data-Metrics-Threats_★★★★☆_IMPORTANT_R10_Gandhi_2025_Repository_Level_Code_Search_Neural_Retrieval__TARGET_Read-Method-Evaluation-Limitations.pdf`
- **حالت مطالعه:** TARGET — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 2, 4, 9
- **بخش‌های الزامی:** Abstract؛ Method / Approach؛ Data / Evaluation؛ Results؛ Limitations / Threats
- **تمرکز:** Lexical baseline؛ Neural reranking؛ Repository-level evaluation metrics
- **ارتباط با پروژه:** RQ2: anchors the Flat lexical baseline and the optional neural-reranking comparison without weakening evidence traceability.

### 04. [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252)

- **شناسه:** `reading-15`
- **فایل:** `C04-O15_TARGET_Read-Data-Metrics-Threats_★★★★☆_IMPORTANT_R42_Petroni_2021_KILT_Knowledge_Intensive_Language_Tasks__TARGET_Read-Method-Evaluation-Limitations.pdf`
- **حالت مطالعه:** TARGET — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 2, 7, 10
- **بخش‌های الزامی:** Abstract؛ Method / Approach؛ Data / Evaluation؛ Results؛ Limitations / Threats
- **تمرکز:** Provenance requirements؛ Seq2Seq knowledge tasks؛ Retrieval versus generation metrics
- **ارتباط با پروژه:** RQ2/Answerability: supports provenance-aware evaluation and explains why BLEU/ROUGE cannot replace retrieval and evidence metrics.

### 05. Zhang et al. 2023: RepoCoder

- **شناسه:** `reading-18`
- **فایل:** `C05-O18_TARGET_Read-Method-Eval_★★★☆☆_SUPPORT_R11_Zhang_2023_RepoCoder_Iterative_Retrieval_and_Generation__RELATED_Read-Abstract-Method-Conclusion.pdf`
- **حالت مطالعه:** TARGET — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 2, 7, 10
- **بخش‌های الزامی:** Abstract؛ Method / Approach؛ Data / Evaluation؛ Results؛ Limitations / Threats
- **تمرکز:** Iterative retrieval؛ Repository context؛ Retrieval-generation feedback
- **ارتباط با پروژه:** RQ2: provides an iterative repository-level retrieval comparison while the thesis keeps generation outside evidence verification.

### 06. Shah et al. 2025: RANGER

- **شناسه:** `reading-19`
- **فایل:** `C06-O19_TARGET_Read-Data-Metrics-Threats_★★★★☆_IMPORTANT_R17_Shah_2025_RANGER_Graph_Enhanced_Repository_Retrieval__TARGET_Read-Method-Evaluation-Limitations.pdf`
- **حالت مطالعه:** TARGET — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 2, 8, 10
- **بخش‌های الزامی:** Abstract؛ Method / Approach؛ Data / Evaluation؛ Results؛ Limitations / Threats
- **تمرکز:** Graph-enhanced retrieval؛ Flat/Graph comparison؛ Data, metrics, and threats
- **ارتباط با پروژه:** Directly informs the RQ2 comparison between Flat Retrieval and Graph Retrieval on the same frozen questions and evidence corpus.

### 07. [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740)

- **شناسه:** `reading-09`
- **فایل:** `C07-O09_TARGET_Read-Data-Metrics-Threats_★★★★★_CORE_R41_Allamanis_2018_Learning_to_Represent_Programs_with_Graphs__TARGET_Read-Method-Evaluation-Limitations.pdf`
- **حالت مطالعه:** TARGET — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 3, 4, 5, 8
- **بخش‌های الزامی:** Abstract؛ Method / Approach؛ Data / Evaluation؛ Results؛ Limitations / Threats
- **تمرکز:** Sequential versus graph code representation؛ Embedding and message passing؛ Evaluation limits
- **ارتباط با پروژه:** RQ1/RQ2: explains why token sequences alone cannot replace explicit code structure and Evidence Paths.

### 08. [Feng et al. 2020: CodeBERT](https://aclanthology.org/2020.findings-emnlp.139/)

- **شناسه:** `reading-10`
- **فایل:** `C08-O10_REVIEW_Read-Taxonomy-Limits_★★★☆☆_NEW_BASELINE_CodeBERT_Pretrained_Model_for_Code_and_Natural_Language__REVIEW_Read-Taxonomy-Comparison-Limitations.pdf`
- **حالت مطالعه:** REVIEW — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 1, 4, 8, 9
- **بخش‌های الزامی:** Abstract؛ Taxonomy / Overview؛ Limitations / Open Problems؛ Conclusion
- **تمرکز:** Natural-language/code pretraining؛ Encoder embeddings؛ Code-search use and limits
- **ارتباط با پروژه:** RQ2: provides a Transformer encoder baseline for matching questions to code candidates; verification still requires Evidence Records.

### 09. [Guo et al. 2021: GraphCodeBERT](https://arxiv.org/pdf/2009.08366)

- **شناسه:** `reading-14`
- **فایل:** `C09-O14_TARGET_Read-Data-Metrics-Threats_★★☆☆☆_Guo_2021_GraphCodeBERT_Data_Flow__RELATED_Read-Abstract-Method-Conclusion.pdf`
- **حالت مطالعه:** TARGET — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 4, 8, 9
- **بخش‌های الزامی:** Abstract؛ Method / Approach؛ Data / Evaluation؛ Results؛ Limitations / Threats
- **تمرکز:** Data-flow-guided self-attention؛ Encoder representation؛ Code-search evaluation
- **ارتباط با پروژه:** RQ2: shows how structural data flow can guide attention while remaining distinct from a verifiable Evidence Path.

### 10. Zhang et al. 2024: Survey on LLMs for Software Engineering

- **شناسه:** `reading-11`
- **فایل:** `C10-O11_REVIEW_Read-Taxonomy-Limits_★★☆☆☆_Zhang_2024_Survey_on_LLMs_for_Software_Engineering__REVIEW_Read-Taxonomy-Comparison-Limitations.pdf`
- **حالت مطالعه:** REVIEW — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 5, 6, 9, 10
- **بخش‌های الزامی:** Abstract؛ Taxonomy / Overview؛ Limitations / Open Problems؛ Conclusion
- **تمرکز:** Model taxonomy؛ Fine-tuning and prompting؛ Software-engineering limitations
- **ارتباط با پروژه:** Positions the thesis against LLM-based software engineering and helps justify a retrieval-and-evidence architecture rather than model-only answers.

### 11. Hou et al. 2024: LLMs for Software Engineering Review

- **شناسه:** `reading-12`
- **فایل:** `C11-O12_REVIEW_Read-Taxonomy-Limits_★★★☆☆_SUPPORT_R24_Hou_2024_LLMs_for_Software_Engineering_Systematic_Review__REVIEW_Read-Taxonomy-Comparison-Limitations.pdf`
- **حالت مطالعه:** REVIEW — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 5, 6, 9, 10
- **بخش‌های الزامی:** Abstract؛ Taxonomy / Overview؛ Limitations / Open Problems؛ Conclusion
- **تمرکز:** RNN/LSTM/GRU position؛ LLM use in software engineering؛ Validity and open problems
- **ارتباط با پروژه:** Defines why recurrent models are course context, not thesis core, and supports the limitations discussion for RQ2.

### 12. [Lewis et al. 2020: Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)

- **شناسه:** `reading-13`
- **فایل:** `C12-O13_TARGET_Read-Method-Eval_★★★☆☆_SUPPORT_R03_Lewis_2020_Retrieval_Augmented_Generation__RELATED_Read-Abstract-Method-Conclusion.pdf`
- **حالت مطالعه:** TARGET — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 7, 10
- **بخش‌های الزامی:** Abstract؛ Method / Approach؛ Data / Evaluation؛ Results؛ Limitations / Threats
- **تمرکز:** Seq2Seq RAG architecture؛ Parametric versus retrieved memory؛ Evaluation setup
- **ارتباط با پروژه:** RQ2: motivates separating retrieval evidence from parametric generation and keeping answerability dependent on retrieved Evidence IDs.

### 13. Tao et al. 2026: Retrieval-Augmented Code Generation Survey

- **شناسه:** `reading-20`
- **فایل:** `C13-O20_REVIEW_Read-Taxonomy-Limits_★★★☆☆_SUPPORT_R27_Tao_2026_Retrieval_Augmented_Code_Generation_Survey__REVIEW_Read-Taxonomy-Comparison-Limitations.pdf`
- **حالت مطالعه:** REVIEW — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 7, 10
- **بخش‌های الزامی:** Abstract؛ Taxonomy / Overview؛ Limitations / Open Problems؛ Conclusion
- **تمرکز:** RAG-for-code taxonomy؛ Retrieval and generation stages؛ Open limitations
- **ارتباط با پروژه:** Frames the thesis within retrieval-augmented code systems and sharpens the boundary between candidate retrieval and answer verification.

### 14. Tao et al. 2025: Code Graph Model

- **شناسه:** `reading-21`
- **فایل:** `C14-O21_RELATED_Read-Abstract-Method-Conclusion_★★★☆☆_SUPPORT_R16_Tao_2025_Code_Graph_Model_CGM_NeurIPS__RELATED_Read-Abstract-Method-Conclusion.pdf`
- **حالت مطالعه:** RELATED — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 8, 9, 10
- **بخش‌های الزامی:** Abstract؛ Method / Approach؛ Conclusion / Limitations
- **تمرکز:** Graph-aware attention؛ Adapter strategy؛ PEFT/QLoRA boundary
- **ارتباط با پروژه:** RQ2: supplies graph-aware neural context and helps keep adapter tuning optional rather than a prerequisite for Evidence Paths.

### 15. Lekssays 2025: LLMxCPG

- **شناسه:** `reading-23`
- **فایل:** `C15-O23_RELATED_Read-Abstract-Method-Conclusion_★★★☆☆_SUPPORT_R14_Lekssays_2025_LLMxCPG_Context_Aware_Program_Analysis__RELATED_Read-Abstract-Method-Conclusion.pdf`
- **حالت مطالعه:** RELATED — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 8, 9, 10
- **بخش‌های الزامی:** Abstract؛ Method / Approach؛ Conclusion / Limitations
- **تمرکز:** LLM and CPG integration؛ Multi-function context؛ Method result and limits
- **ارتباط با پروژه:** RQ1/RQ2: connects multi-function CPG context to Graph Retrieval and explicit Evidence Paths across repository boundaries.

### 16. Olea et al. 2024: Persona Prompting for Question Answering

- **شناسه:** `reading-16`
- **فایل:** `C16-O16_TARGET_Read-Data-Metrics-Threats_★★★★☆_IMPORTANT_R23_Olea_2024_Persona_Prompting_for_Question_Answering__TARGET_Read-Method-Evaluation-Limitations.pdf`
- **حالت مطالعه:** TARGET — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 9, 10
- **بخش‌های الزامی:** Abstract؛ Method / Approach؛ Data / Evaluation؛ Results؛ Limitations / Threats
- **تمرکز:** Persona prompt design؛ QA evaluation؛ Role effects and threats
- **ارتباط با پروژه:** Supports role-specific Developer, Architect, and QA prompts while preserving a shared evidence and answerability contract.

### 17. Abedu et al. 2025: LLM + Knowledge Graph Repository QA

- **شناسه:** `reading-17`
- **فایل:** `C17-O17_DEEP_Read-KG-QA-Pipeline-Eval_★★★★★_CORE_R15_Abedu_2025_LLM_Knowledge_Graph_Repository_QA__DEEP_Read-KG-QA-Pipeline-Evaluation.pdf`
- **حالت مطالعه:** DEEP — Vollständig lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 9, 10
- **بخش‌های الزامی:** Gesamter Artikel – vom Abstract bis zur Conclusion einschließlich Evaluation und Limitations
- **تمرکز:** Repository QA pipeline؛ Knowledge-graph grounding؛ Prompting and evaluation
- **ارتباط با پروژه:** Closest RQ2 comparison: repository QA over a Knowledge Graph, evaluated against the thesis Evidence Path and refusal boundary.

### 18. Lekssays 2026: Bridging CPGs and Language Models

- **شناسه:** `reading-22`
- **فایل:** `C18-O22_TARGET_Read-Data-Metrics-Threats_★★★★☆_IMPORTANT_R13_Lekssays_2026_Bridging_CPGs_and_Language_Models__TARGET_Read-Method-Evaluation-Limitations.pdf`
- **حالت مطالعه:** TARGET — Nur diese Abschnitte lesen
- **وضعیت اولیه در برنامه:** planned
- **جلسه‌های مرتبط:** 9, 10
- **بخش‌های الزامی:** Abstract؛ Method / Approach؛ Data / Evaluation؛ Results؛ Limitations / Threats
- **تمرکز:** CPG-constrained context؛ Language-model integration؛ Traceability and evaluation
- **ارتباط با پروژه:** RQ1/RQ2: shows how CPG structure can constrain context and improve traceability without treating generated text as evidence.

## دوره NLP مرتبط

| مورد | مقدار |
| --- | --- |
| نام | Advanced Deep Learning – Natural Language Processing |
| مدرس | Farshid Shirafkan |
| پلتفرم | Google Meet |
| بازه | 2026-08-17 تا 2026-09-07 |
| زمان برلین | 19:30–21:10 |
| تعداد جلسه | 10 |

### جلسه 1 — 2026-08-17 — Introduction to NLP, preprocessing, and tokenization

- **زمان:** 19:30–21:10 برلین / 21:00–22:40 ایران
- **موضوع‌ها:** Introduction to Natural Language Processing؛ Text Preprocessing؛ Basic Text Representation؛ Tokenization
- **پرسش پروژه:** Which code tokens must remain searchable without destroying source evidence?
- **کاربرد:** Read how code and natural language are tokenized for retrieval
- **مطالعه مرتبط:** [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782) (TARGET)؛ [Feng et al. 2020: CodeBERT](https://aclanthology.org/2020.findings-emnlp.139/) (REVIEW)
- **تمرکز مطالعه:** Tokenization choices؛ Code and natural-language representation؛ Effect on retrieval context
- **ارتباط با پروژه:** Links input representation to Flat Retrieval while source spans remain in the Evidence Record.
- **هدف استخراج:** Extract tokenization decisions and their likely effects on recall, context length, and traceability.
- **چرا مهم است:** چون کیفیت توکنیزیشن تعیین می‌کند کدام بخش‌های کد قابل جست‌وجو بمانند، بدون اینکه مسیر شواهد و محل منبع از بین برود.
- **اقدام برنامه‌ریزی‌شده:** یک tokenizer آگاه از ساختار کد می‌سازم، spanها را حفظ می‌کنم و آن را با fixtureهای ثابت آزمایش می‌کنم.

**پرسش‌های کلاس:**

- برای کدهای camelCase و snake_case چه نوع توکنیزیشنی مناسب‌تر است؟
- چگونه هنگام پیش‌پردازش، SourceLocation و مرز دقیق کد را حفظ کنم؟
- کدام خطاهای توکنیزیشن بیشترین کاهش Recall را در بازیابی کد ایجاد می‌کنند؟

### جلسه 2 — 2026-08-19 — Bag-of-Words, TF-IDF, vector space, and cosine similarity

- **زمان:** 19:30–21:10 برلین / 21:00–22:40 ایران
- **موضوع‌ها:** Bag-of-Words Model؛ TF-IDF؛ Vector Space Models؛ Cosine Similarity
- **پرسش پروژه:** What is the simplest reproducible Flat baseline for RQ2?
- **کاربرد:** Compare lexical, iterative, and graph-enhanced repository retrieval
- **مطالعه مرتبط:** [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782) (TARGET)؛ Gandhi et al. 2025: Repository-Level Code Search (TARGET)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) (TARGET)؛ Zhang et al. 2023: RepoCoder (TARGET)؛ Shah et al. 2025: RANGER (TARGET)
- **تمرکز مطالعه:** Lexical baseline؛ Retrieval metrics and provenance؛ Flat versus graph-enhanced ranking
- **ارتباط با پروژه:** Direct RQ2 basis for the Flat/Graph Retrieval comparison and provenance-aware evaluation.
- **هدف استخراج:** Extract comparable retrieval methods, datasets, metrics, and threats for the RQ2 evaluation table.
- **چرا مهم است:** چون TF-IDF و cosine ساده‌ترین baseline قابل بازتولید برای پاسخ به RQ2 و مقایسه منصفانه با روش گرافی هستند.
- **اقدام برنامه‌ریزی‌شده:** یک index نسخه‌بندی‌شده و ranker پایدار می‌سازم و baseline را با Recall@k، MRR و زمان اجرا ثبت می‌کنم.

**پرسش‌های کلاس:**

- برای corpus کوچک پایان‌نامه، پارامترهای TF-IDF را چگونه انتخاب و ثابت کنم؟
- در cosine similarity با بردار صفر و امتیازهای مساوی چه رفتاری درست و قابل بازتولید است؟
- برای مقایسه baseline با بازیابی گرافی، Recall@k و MRR را چگونه گزارش کنم؟

### جلسه 3 — 2026-08-22 — Word2Vec, CBOW, and Skip-Gram

- **زمان:** 19:30–21:10 برلین / 21:00–22:40 ایران
- **موضوع‌ها:** Word2Vec؛ Continuous Bag-of-Words (CBOW)؛ Skip-Gram
- **پرسش پروژه:** Can subword semantics improve code retrieval enough to justify added cost?
- **کاربرد:** Understand learned code representations without implementing a model
- **مطالعه مرتبط:** [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740) (TARGET)
- **تمرکز مطالعه:** Token embeddings؛ Context learning؛ Loss of explicit graph structure
- **ارتباط با پروژه:** Clarifies why learned embeddings may rank candidates but cannot replace an explicit Evidence Path.
- **هدف استخراج:** Extract how the paper represents programs and where sequential embedding assumptions break down.
- **چرا مهم است:** چون embedding ممکن است شباهت معنایی را بهتر پیدا کند، اما باید نشان دهد هزینه اضافه‌اش نسبت به baseline واقعاً ارزش دارد.
- **اقدام برنامه‌ریزی‌شده:** یک آزمایش کوچک با seed و corpus ثابت اجرا می‌کنم و نتیجه را فقط در صورت بهبود قابل اندازه‌گیری نگه می‌دارم.

**پرسش‌های کلاس:**

- برای واژه‌ها و شناسه‌های کد، CBOW بهتر است یا Skip-gram و چرا؟
- حداقل اندازه corpus برای یادگیری embedding قابل اتکا چقدر است؟
- چگونه Word2Vec را منصفانه و با همان داده‌ها با TF-IDF مقایسه کنم؟

### جلسه 4 — 2026-08-24 — GloVe, FastText, and embedding layers in Keras

- **زمان:** 19:30–21:10 برلین / 21:00–22:40 ایران
- **موضوع‌ها:** GloVe؛ FastText؛ Using Embedding Layers in Keras
- **پرسش پروژه:** Which embedding representations are useful retrieval baselines for code and text?
- **کاربرد:** Compare word, subword, code-language, and graph-aware embeddings
- **مطالعه مرتبط:** Gandhi et al. 2025: Repository-Level Code Search (TARGET)؛ [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740) (TARGET)؛ [Feng et al. 2020: CodeBERT](https://aclanthology.org/2020.findings-emnlp.139/) (REVIEW)؛ [Guo et al. 2021: GraphCodeBERT](https://arxiv.org/pdf/2009.08366) (TARGET)
- **تمرکز مطالعه:** Embedding input and objective؛ Subword and code structure؛ Code-search evaluation
- **ارتباط با پروژه:** RQ2 comparison point for optional semantic ranking while Evidence Records remain the verification source.
- **هدف استخراج:** Extract representation choices, evaluation setup, and the architectural boundary between embedding and evidence.
- **چرا مهم است:** چون انتخاب نوع embedding روی پوشش شناسه‌های ناشناخته، هزینه اجرا و کیفیت بازیابی معنایی اثر مستقیم دارد.
- **اقدام برنامه‌ریزی‌شده:** نمایش‌های مختلف را از نظر داده، هزینه و معیار ارزیابی مقایسه می‌کنم و برای ادامه یا توقف یک تصمیم مستند می‌نویسم.

**پرسش‌های کلاس:**

- FastText برای شناسه‌های ناآشنا و زیرواژه‌های کد چه مزیتی دارد؟
- ورودی، خروجی و روش آموزش لایه Embedding در Keras دقیقاً چگونه تعریف می‌شود؟
- GloVe، FastText و embeddingهای مخصوص کد را با چه معیار مشترکی مقایسه کنم؟

### جلسه 5 — 2026-08-26 — Recurrent neural networks and the vanishing-gradient problem

- **زمان:** 19:30–21:10 برلین / 21:00–22:40 ایران
- **موضوع‌ها:** Recurrent Neural Networks (RNNs)؛ The Vanishing Gradient Problem
- **پرسش پروژه:** Why is recurrent sequence memory outside the thesis core?
- **کاربرد:** Place recurrent architectures within the software-engineering model taxonomy
- **مطالعه مرتبط:** [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740) (TARGET)؛ Zhang et al. 2024: Survey on LLMs for Software Engineering (REVIEW)؛ Hou et al. 2024: LLMs for Software Engineering Review (REVIEW)
- **تمرکز مطالعه:** Sequential model assumptions؛ Software-engineering uses؛ Limitations versus graph structure
- **ارتباط با پروژه:** Supports the scope decision that repository Evidence Paths need explicit structure rather than hidden recurrent state.
- **هدف استخراج:** Extract evidence for treating RNNs as background rather than a required project component.
- **چرا مهم است:** چون باید روشن کنم آیا حافظه توالی‌دار برای RQهای پایان‌نامه ضروری است یا فقط دانش زمینه‌ای محسوب می‌شود.
- **اقدام برنامه‌ریزی‌شده:** دامنه و هزینه RNN را در یک تصمیم معماری ثبت می‌کنم و بدون داده کافی آن را به کار اجباری تبدیل نمی‌کنم.

**پرسش‌های کلاس:**

- محو شدن گرادیان در RNN دقیقاً چگونه حافظه توالی‌های بلند را محدود می‌کند؟
- RNN در چه نوع مسئله‌ای از تحلیل مخزن کد واقعاً مناسب است؟
- برای وارد کردن RNN به دامنه پایان‌نامه چه شواهد و داده‌ای لازم دارم؟

### جلسه 6 — 2026-08-29 — LSTM, GRU, and sentiment analysis

- **زمان:** 19:30–21:10 برلین / 21:00–22:40 ایران
- **موضوع‌ها:** Advanced Recurrent Architectures: LSTM and GRU؛ Sentiment Analysis Project Using LSTM
- **پرسش پروژه:** What does the recurrent-model literature contribute to scope and limitations?
- **کاربرد:** Distinguish course examples from thesis-relevant architecture
- **مطالعه مرتبط:** Zhang et al. 2024: Survey on LLMs for Software Engineering (REVIEW)؛ Hou et al. 2024: LLMs for Software Engineering Review (REVIEW)
- **تمرکز مطالعه:** LSTM/GRU positioning؛ Task-specific evaluation؛ Why the thesis does not train them
- **ارتباط با پروژه:** Creates a defensible scope boundary: reading is required, recurrent-model implementation is optional and not backlog.
- **هدف استخراج:** Extract taxonomy and limitations only; do not create a mandatory sentiment-analysis implementation.
- **چرا مهم است:** چون مثال کلاسی تحلیل احساسات مفید است، اما مسئله و برچسب‌های آن با شواهد ساختاری مخزن کد یکسان نیست.
- **اقدام برنامه‌ریزی‌شده:** LSTM و GRU را فقط از نظر تناسب با مسئله مقایسه می‌کنم و در صورت نبود داده مناسب، آن‌ها را خارج از هسته پروژه نگه می‌دارم.

**پرسش‌های کلاس:**

- برای داده محدود، تفاوت عملی LSTM و GRU در دقت، سرعت و overfitting چیست؟
- مثال تحلیل احساسات از نظر نوع label چه تفاوتی با داده‌های پایان‌نامه من دارد؟
- چه آزمایشی ثابت می‌کند یک مدل بازگشتی ارزش اضافه شدن به پروژه را دارد؟

### جلسه 7 — 2026-08-31 — Sequence-to-Sequence and introduction to Transformers

- **زمان:** 19:30–21:10 برلین / 21:00–22:40 ایران
- **موضوع‌ها:** Sequence-to-Sequence Architecture (Seq2Seq)؛ Introduction to the Transformer Architecture
- **پرسش پروژه:** How should retrieval remain separated from parametric generation?
- **کاربرد:** Trace the transition from Seq2Seq generation to retrieval-augmented systems
- **مطالعه مرتبط:** [Lewis et al. 2020: Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401) (TARGET)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) (TARGET)؛ Zhang et al. 2023: RepoCoder (TARGET)؛ Tao et al. 2026: Retrieval-Augmented Code Generation Survey (REVIEW)
- **تمرکز مطالعه:** Seq2Seq architecture؛ Parametric and retrieved memory؛ Iterative repository retrieval
- **ارتباط با پروژه:** RQ2/Answerability: generation may consume retrieved context, but only Evidence Records can support a repository claim.
- **هدف استخراج:** Extract the retrieval-generation boundary, provenance expectations, and evaluation limitations.
- **چرا مهم است:** چون سامانه باید سؤال طبیعی را به قرارداد قابل اعتبارسنجی تبدیل کند و تولید متن را از شواهد بازیابی‌شده جدا نگه دارد.
- **اقدام برنامه‌ریزی‌شده:** QuestionContract و fixtureها را می‌سازم و مرز روشن retrieval، verification و generation را تعریف می‌کنم.

**پرسش‌های کلاس:**

- در Seq2Seq و Transformer مرز encoder و decoder دقیقاً چه مسئولیتی دارد؟
- چگونه سؤال طبیعی را به JSON معتبر و قابل کنترل تبدیل کنم؟
- هنگام تولید پاسخ، منبع و شناسه evidence را چگونه بدون تغییر حفظ کنم؟

### جلسه 8 — 2026-09-02 — Self-attention, multi-head attention, and positional encoding

- **زمان:** 19:30–21:10 برلین / 21:00–22:40 ایران
- **موضوع‌ها:** Self-Attention؛ Multi-Head Attention؛ Positional Encoding
- **پرسش پروژه:** How can attention use structure without becoming evidence?
- **کاربرد:** Compare graph-aware attention with explicit graph traversal and provenance
- **مطالعه مرتبط:** [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view) (DEEP)؛ [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782) (TARGET)؛ [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740) (TARGET)؛ [Guo et al. 2021: GraphCodeBERT](https://arxiv.org/pdf/2009.08366) (TARGET)؛ Shah et al. 2025: RANGER (TARGET)؛ Tao et al. 2025: Code Graph Model (RELATED)؛ Lekssays 2025: LLMxCPG (RELATED)
- **تمرکز مطالعه:** Attention and data-flow signals؛ Graph-aware context؛ Provenance versus latent weights
- **ارتباط با پروژه:** RQ1/RQ2: relates attention-guided retrieval to Graph Retrieval while preserving explicit Evidence Paths.
- **هدف استخراج:** Extract where graph or data-flow structure enters attention and where traceability is lost or preserved.
- **چرا مهم است:** چون attention می‌تواند بازیابی را هدایت کند، اما وزن پنهان آن نباید به‌عنوان مدرک یک ادعای ساختاری تلقی شود.
- **اقدام برنامه‌ریزی‌شده:** attention و مسیر گراف صریح را مقایسه می‌کنم و verifier را طوری می‌سازم که فقط evidence قابل حل را بپذیرد.

**پرسش‌های کلاس:**

- وزن‌های attention چه چیزی را نشان می‌دهند و چه چیزی را اثبات نمی‌کنند؟
- Positional Encoding چگونه با ساختار گراف و جریان داده کد تفاوت دارد؟
- چرا attention به‌تنهایی نمی‌تواند جای Evidence Path قابل بررسی را بگیرد؟

### جلسه 9 — 2026-09-05 — Transformer encoder/decoder, BERT, and GPT

- **زمان:** 19:30–21:10 برلین / 21:00–22:40 ایران
- **موضوع‌ها:** Transformer Encoder and Decoder؛ BERT Family—Encoder-Based Models؛ GPT Family—Decoder-Based Models
- **پرسش پروژه:** How can optional neural retrieval and answer wording remain role-aware and grounded?
- **کاربرد:** Position encoder retrieval, decoder generation, role prompts, and graph context
- **مطالعه مرتبط:** Gandhi et al. 2025: Repository-Level Code Search (TARGET)؛ [Feng et al. 2020: CodeBERT](https://aclanthology.org/2020.findings-emnlp.139/) (REVIEW)؛ Zhang et al. 2024: Survey on LLMs for Software Engineering (REVIEW)؛ Hou et al. 2024: LLMs for Software Engineering Review (REVIEW)؛ [Guo et al. 2021: GraphCodeBERT](https://arxiv.org/pdf/2009.08366) (TARGET)؛ Olea et al. 2024: Persona Prompting for Question Answering (TARGET)؛ Abedu et al. 2025: LLM + Knowledge Graph Repository QA (DEEP)؛ Tao et al. 2025: Code Graph Model (RELATED)؛ Lekssays 2026: Bridging CPGs and Language Models (TARGET)؛ Lekssays 2025: LLMxCPG (RELATED)
- **تمرکز مطالعه:** Encoder versus decoder role؛ Code/repository QA؛ Role-aware grounded answers
- **ارتباط با پروژه:** RQ2/Answerability: encoders may retrieve and decoders may phrase answers, but both remain downstream of verifiable evidence.
- **هدف استخراج:** Extract architecture comparisons, QA pipelines, prompting effects, and limitations relevant to role-specific answers.
- **چرا مهم است:** چون نقش encoder در بازیابی و decoder در نگارش پاسخ باید از منبع شواهد جدا و قابل کنترل باقی بماند.
- **اقدام برنامه‌ریزی‌شده:** برای BERT/GraphCodeBERT تصمیم Go/No-Go می‌گیرم و خروجی نقش‌ها را روی یک RetrievalRun و evidence مشترک می‌سازم.

**پرسش‌های کلاس:**

- برای retrieval چه زمانی encoderهایی مثل BERT مناسب‌تر از decoder هستند؟
- GPT را چگونه فقط برای بیان پاسخ و نه ساختن evidence به کار ببرم؟
- چگونه پاسخ Developer، Architect و QA متفاوت باشد ولی ادعاها و شواهد یکسان بمانند؟

### جلسه 10 — 2026-09-07 — Prompt engineering, PEFT, RAG, BLEU, and ROUGE

- **زمان:** 19:30–21:10 برلین / 21:00–22:40 ایران
- **موضوع‌ها:** Prompt Engineering؛ Parameter-Efficient Fine-Tuning (PEFT)؛ LoRA and QLoRA؛ Retrieval-Augmented Generation (RAG)؛ BLEU and ROUGE
- **پرسش پروژه:** Which parts belong in the thesis core, optional experiments, and future work?
- **کاربرد:** Synthesize retrieval, graph grounding, prompting, provenance, and evaluation
- **مطالعه مرتبط:** [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view) (DEEP)؛ [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782) (TARGET)؛ Zhang et al. 2024: Survey on LLMs for Software Engineering (REVIEW)؛ Hou et al. 2024: LLMs for Software Engineering Review (REVIEW)؛ [Lewis et al. 2020: Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401) (TARGET)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) (TARGET)؛ Olea et al. 2024: Persona Prompting for Question Answering (TARGET)؛ Abedu et al. 2025: LLM + Knowledge Graph Repository QA (DEEP)؛ Zhang et al. 2023: RepoCoder (TARGET)؛ Shah et al. 2025: RANGER (TARGET)؛ Tao et al. 2026: Retrieval-Augmented Code Generation Survey (REVIEW)؛ Tao et al. 2025: Code Graph Model (RELATED)؛ Lekssays 2026: Bridging CPGs and Language Models (TARGET)؛ Lekssays 2025: LLMxCPG (RELATED)
- **تمرکز مطالعه:** RAG and PEFT boundaries؛ Retrieval and generation metrics؛ Grounding, provenance, and answerability
- **ارتباط با پروژه:** Synthesizes RQ1/RQ2 and fixes the boundary: BLEU/ROUGE assess generated text, not retrieval completeness or Evidence Path validity.
- **هدف استخراج:** Complete the six-section notes and record a final architecture decision for each paper: core, comparison, background, or future work.
- **چرا مهم است:** چون هسته پروژه باید پاسخ grounded و قابل ردگیری بدهد؛ معیار شباهت متن یا fine-tuning به‌تنهایی درستی evidence را تضمین نمی‌کند.
- **اقدام برنامه‌ریزی‌شده:** قرارداد RAG grounded و refusal را پیاده می‌کنم، مرز معیارها را ثبت می‌کنم و PEFT را فقط با منفعت سنجش‌پذیر به آینده یا آزمایش اختیاری می‌برم.

**پرسش‌های کلاس:**

- چه زمانی LoRA یا QLoRA برای این پروژه واقعاً توجیه دارد؟
- RAG در نبود evidence کافی چگونه باید پاسخ ندادن درست را اجرا کند؟
- محدودیت BLEU و ROUGE برای سنجش درستی ادعا و کامل بودن شواهد چیست؟

## برنامه هفتگی و روزانه

## هفته 1 — Problem, Stakeholder und vertretbarer Scope

- **فاز:** Design 1: Problem und Anforderungen
- **هدف هفته:** Der Plan beginnt am 30. August. Problem, Nutzende, Anforderungen und Projektgrenzen werden präzise und testbar, bevor die medizinisch geschützten Pausen beginnen.
- **خروجی الزامی هفته:** `week-01-integration-evidence.md` (روز `capacity-w1-integration`)
- **بازه:** 2026-08-30 تا 2026-09-03

### روز 1 — 2026-08-30 — Problemstellung und Projektwert

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w1-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Design / Problem Framing |
| خروجی روز | `problem-statement-v1.md` |
| منبع‌ها | [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view) |
| بخش‌های Exposé | 1, 6, 7 |

**دلیل:** Ohne präzises Problem zerfallen Architektur und Implementierung in unverbundene Funktionen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 6 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: Semantic code graph and cross-repository links.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-06-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Conducting Research](https://owl.purdue.edu/owl/research_and_citation/conducting_research/index.html) — Purdue Online Writing Lab، 15 دقیقه
  - **بخوان:** Starting the Research Process und Choosing a Topic; nutze nur die Schritte von Problem zu fokussierbarer Frage.
  - **به‌کار ببر:** Formuliere Problem, Ziel und geplanten Beleg getrennt, bevor du das Tagesartefakt beginnst.
- [Learning about users and their needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) — GOV.UK Service Manual، 15 دقیقه
  - **بخوان:** Understanding user needs, Writing user needs und Linking user needs to user stories.
  - **به‌کار ببر:** Schreibe jeden Bedarf als Ziel und Nutzen; behandle unbelegte Annahmen ausdrücklich als Annahmen.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Formuliere das Kernproblem der Cross-Repository-Analyse in einem Satz <!-- w1-d1-t1-i1 -->
- [ ] Kläre den Unterschied zwischen Evidenz und Textähnlichkeit <!-- w1-d1-t1-i2 -->
- [ ] Beschreibe den Artefaktwert für drei Rollen getrennt <!-- w1-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 1, § 6, § 7 <!-- w1-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Design / Problem Framing aus <!-- w1-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w1-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: problem-statement-v1.md <!-- w1-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w1-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w1-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-08-31 — Stakeholder und Personas

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w1-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Design / Stakeholders |
| خروجی روز | `stakeholders-and-personas.md` |
| منبع‌ها | [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view) |
| بخش‌های Exposé | 1.6, 25, 26 |

**دلیل:** Developer, Architect und QA benötigen unterschiedliche Fragen und Evidenzstufen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 6 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Provenance and evaluation design.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Provenance and evaluation design“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-06-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Personas: Study Guide](https://www.nngroup.com/articles/personas-study-guide/) — Nielsen Norman Group، 15 دقیقه
  - **بخوان:** What Is a Persona? sowie die ersten Hinweise unter How to Create Personas.
  - **به‌کار ببر:** Beschreibe Developer, Architect und QA anhand von Ziel, Entscheidung, Kontext und Informationsbedarf statt nur anhand ihrer Jobtitel.
- [Learning about users and their needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) — GOV.UK Service Manual، 15 دقیقه
  - **بخوان:** Understanding user needs, Writing user needs und Linking user needs to user stories.
  - **به‌کار ببر:** Schreibe jeden Bedarf als Ziel und Nutzen; behandle unbelegte Annahmen ausdrücklich als Annahmen.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Extrahiere das Ziel jeder Persona <!-- w1-d2-t1-i1 -->
- [ ] Bestimme die Entscheidung, die jede Rolle mit der Antwort trifft <!-- w1-d2-t1-i2 -->
- [ ] Dokumentiere Informationen, die einer Rolle nicht gezeigt werden dürfen <!-- w1-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 1.6, § 25, § 26 <!-- w1-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Design / Stakeholders aus <!-- w1-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w1-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: stakeholders-and-personas.md <!-- w1-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w1-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w1-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-09-01 — Funktionale Anforderungen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w1-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Design / Requirements |
| خروجی روز | `functional-requirements.yaml` |
| منبع‌ها | [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 3, 7, 10 |

**دلیل:** Jede Fähigkeit braucht Eingabe, Ausgabe und Akzeptanzkriterium.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 6 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Differences from Evidence Record and Evidence Path.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Differences from Evidence Record and Evidence Path“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-06-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [User stories with examples and a template](https://www.atlassian.com/agile/project-management/user-stories) — Atlassian Agile Coach، 12 دقیقه
  - **بخوان:** What is in a user story?, die 3 C's und User story template.
  - **به‌کار ببر:** Überführe Persona, Ziel und Nutzen in As a / I want / so that und ergänze testbare Bestätigung.
- [Acceptance criteria: definition, examples and tips](https://www.atlassian.com/work-management/project-management/acceptance-criteria) — Atlassian، 12 دقیقه
  - **بخوان:** Acceptance criteria vs. user story und die Beispiele für klare, messbare Bedingungen.
  - **به‌کار ببر:** Formuliere Erfolg als beobachtbare Bedingung; vermeide Formulierungen wie ‚funktioniert gut‘.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Trenne Extract, Map, Persist, Retrieve und Answer <!-- w1-d3-t1-i1 -->
- [ ] Definiere Ein- und Ausgabe jeder Fähigkeit <!-- w1-d3-t1-i2 -->
- [ ] Verbinde jede Anforderung mit einer Forschungsfrage <!-- w1-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3, § 7, § 10 <!-- w1-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Design / Requirements aus <!-- w1-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w1-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: functional-requirements.yaml <!-- w1-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w1-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w1-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-09-02 — Nichtfunktionale Anforderungen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w1-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Design / Quality Attributes |
| خروجی روز | `quality-attribute-scenarios.md` |
| منبع‌ها | [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [arc42: Vorlage zur Softwarearchitektur-Dokumentation](https://arc42.org/overview/) |
| بخش‌های Exposé | 9, 11.3, 17, 38 |

**دلیل:** Reproduzierbarkeit, Erklärbarkeit und Sicherheit steuern Architekturentscheidungen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 6 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Differences from Evidence Record and Evidence Path.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Differences from Evidence Record and Evidence Path“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-06-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [User stories with examples and a template](https://www.atlassian.com/agile/project-management/user-stories) — Atlassian Agile Coach، 12 دقیقه
  - **بخوان:** What is in a user story?, die 3 C's und User story template.
  - **به‌کار ببر:** Überführe Persona, Ziel und Nutzen in As a / I want / so that und ergänze testbare Bestätigung.
- [Acceptance criteria: definition, examples and tips](https://www.atlassian.com/work-management/project-management/acceptance-criteria) — Atlassian، 12 دقیقه
  - **بخوان:** Acceptance criteria vs. user story und die Beispiele für klare, messbare Bedingungen.
  - **به‌کار ببر:** Formuliere Erfolg als beobachtbare Bedingung; vermeide Formulierungen wie ‚funktioniert gut‘.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Priorisiere die wichtigsten Qualitätsziele <!-- w1-d4-t1-i1 -->
- [ ] Definiere Kriterien für Determinismus und Traceability <!-- w1-d4-t1-i2 -->
- [ ] Dokumentiere Zeit-, Daten- und Technologiegrenzen <!-- w1-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 9, § 11.3, § 17, § 38 <!-- w1-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Design / Quality Attributes aus <!-- w1-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w1-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: quality-attribute-scenarios.md <!-- w1-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w1-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w1-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-09-03 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w1-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-01-integration-evidence.md` |
| منبع‌ها | [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view) |
| بخش‌های Exposé | 1, 6, 7, 1.6 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 6: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-06-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w1-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w1-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w1-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 1, § 6, § 7, § 1.6 <!-- capacity-w1-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w1-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w1-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-01-integration-evidence.md <!-- capacity-w1-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w1-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w1-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 2 — Problem, Stakeholder und vertretbarer Scope → C4, Datenfluss und Modulgrenzen

- **فاز:** Design 1: Problem und Anforderungen / Design 2: Systemarchitektur
- **هدف هفته:** Der Plan beginnt am 30. August. Problem, Nutzende, Anforderungen und Projektgrenzen werden präzise und testbar, bevor die medizinisch geschützten Pausen beginnen. Systemstruktur von Context bis Component sowie Modulverträge werden vor der Implementierung fixiert.
- **خروجی الزامی هفته:** `week-02-integration-evidence.md` (روز `capacity-w2-integration`)
- **بازه:** 2026-09-04 تا 2026-09-17

### روز 1 — 2026-09-04 — Grenze von Core, Extension und Future

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w1-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Design / Scope |
| خروجی روز | `scope-boundary-v1.md` |
| منبع‌ها | [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Alshemaimri et al. 2021: Database Code Fragments Survey](https://onlinelibrary.wiley.com/doi/full/10.1002/eng2.12441) |
| بخش‌های Exposé | 8, 31, 37 |

**دلیل:** Ein fester Scope verhindert, dass das Projekt vor der Evaluation endlos wird.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 7 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: Data-flow-aware token and context selection.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-07-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Fixiere Roslyn, EF Core und Tabellenebene im Core <!-- w1-d5-t1-i1 -->
- [ ] Trenne Fähigkeiten, die von Beobachtungen im Corpus abhängen <!-- w1-d5-t1-i2 -->
- [ ] Verschiebe ADO.NET, SQL, Stored Procedures und neuronale Ansätze nach Future <!-- w1-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 8, § 31, § 37 <!-- w1-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Design / Scope aus <!-- w1-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w1-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: scope-boundary-v1.md <!-- w1-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w1-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w1-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-09-07 — Anforderungs-Review-Gate

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w1-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Design / Review |
| خروجی روز | `requirements-review-checklist.md` |
| منبع‌ها | [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view) |
| بخش‌های Exposé | 7, 16, 20 |

**دلیل:** Die Woche endet erst, wenn jede Anforderung nachvollziehbar und testbar ist.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 7 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Retrieval method and metrics.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Retrieval method and metrics“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-07-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Acceptance criteria: definition, examples and tips](https://www.atlassian.com/work-management/project-management/acceptance-criteria) — Atlassian، 12 دقیقه
  - **بخوان:** Acceptance criteria vs. user story und die Beispiele für klare, messbare Bedingungen.
  - **به‌کار ببر:** Formuliere Erfolg als beobachtbare Bedingung; vermeide Formulierungen wie ‚funktioniert gut‘.
- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Finde mehrdeutige Anforderungen <!-- w1-d6-t1-i1 -->
- [ ] Verbinde jede Anforderung mit RQ und Persona <!-- w1-d6-t1-i2 -->
- [ ] Reduziere Anforderungen ohne Akzeptanzkriterium auf null <!-- w1-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7, § 16, § 20 <!-- w1-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Design / Review aus <!-- w1-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w1-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: requirements-review-checklist.md <!-- w1-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w1-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w1-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-09-08 — System Context Diagram

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w2-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Architecture / C4 |
| خروجی روز | `c4-context.dsl` |
| منبع‌ها | [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782)؛ [C4 Model: Context-, Container- und Component-Diagramme](https://c4model.com/diagrams)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 1.6, 3, 9 |

**دلیل:** Das Diagramm zeigt die Beziehungen zu Nutzenden, GitHub/lokalen Repositories, Neo4j und LLM.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 7 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Threats and repository-level limits.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Threats and repository-level limits“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-07-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [C4 model diagrams](https://c4model.com/diagrams) — C4 Model، 15 دقیقه
  - **بخوان:** System Context, Container und Component diagram; Code diagram nur bei echtem Mehrwert.
  - **به‌کار ببر:** Wähle genau die Zoomstufe des Tages und beschrifte Personen, Systeme, Container und Beziehungen.
- [Maintain an architecture decision record](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Implement an ADR und Suggested characteristics of an individual record.
  - **به‌کار ببر:** Dokumentiere Kontext, Optionen, Entscheidung, Trade-offs, Status und Confidence.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Bestimme externe Personen und Softwaresysteme <!-- w2-d1-t1-i1 -->
- [ ] Definiere Vertrauen und Eigentum jeder Boundary <!-- w2-d1-t1-i2 -->
- [ ] Entferne Technologiedetails aus dem Context <!-- w2-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 1.6, § 3, § 9 <!-- w2-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Architecture / C4 aus <!-- w2-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w2-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: c4-context.dsl <!-- w2-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w2-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w2-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-09-09 — Container Diagram

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w2-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Architecture / C4 |
| خروجی روز | `c4-containers.dsl` |
| منبع‌ها | [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782)؛ [C4 Model: Context-, Container- und Component-Diagramme](https://c4model.com/diagrams)؛ [arc42: Vorlage zur Softwarearchitektur-Dokumentation](https://arc42.org/overview/) |
| بخش‌های Exposé | 3, 10, 38.2 |

**دلیل:** Container trennen Ausführung, Speicherung und Benutzeroberfläche.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 7 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Threats and repository-level limits.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Threats and repository-level limits“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-07-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [C4 model diagrams](https://c4model.com/diagrams) — C4 Model، 15 دقیقه
  - **بخوان:** System Context, Container und Component diagram; Code diagram nur bei echtem Mehrwert.
  - **به‌کار ببر:** Wähle genau die Zoomstufe des Tages und beschrifte Personen, Systeme, Container und Beziehungen.
- [Maintain an architecture decision record](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Implement an ADR und Suggested characteristics of an individual record.
  - **به‌کار ببر:** Dokumentiere Kontext, Optionen, Entscheidung, Trade-offs, Status und Confidence.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Grenze CLI/API, Extractor, Graph Store und UI ab <!-- w2-d2-t1-i1 -->
- [ ] Beschreibe Protokoll und übertragene Daten jeder Beziehung <!-- w2-d2-t1-i2 -->
- [ ] Definiere jeden Container als stateful oder stateless <!-- w2-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3, § 10, § 38.2 <!-- w2-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Architecture / C4 aus <!-- w2-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w2-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: c4-containers.dsl <!-- w2-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w2-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w2-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-09-17 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w2-integration` |
| حالت کار | Paper-only |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-02-integration-evidence.md` |
| منبع‌ها | [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Alshemaimri et al. 2021: Database Code Fragments Survey](https://onlinelibrary.wiley.com/doi/full/10.1002/eng2.12441)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view)؛ [C4 Model: Context-, Container- und Component-Diagramme](https://c4model.com/diagrams) |
| بخش‌های Exposé | 8, 31, 37, 7 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 7: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-07-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w2-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w2-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w2-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte auf Papier mit § 8, § 31, § 37, § 7 <!-- capacity-w2-integration-t2-i1 -->
- [ ] Skizziere ein reales Beispiel oder Fixture für Weekly Integration / Evidence ohne Bildschirm <!-- capacity-w2-integration-t2-i2 -->
- [ ] Markiere, welcher rückverfolgbare Beleg nach der Bildschirmfreigabe geprüft werden muss <!-- capacity-w2-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Entwirf das Tagesergebnis auf Papier: week-02-integration-evidence.md <!-- capacity-w2-integration-t3-i1 -->
- [ ] Notiere Testidee, Akzeptanzkriterium und offene Bildschirmprüfung getrennt <!-- capacity-w2-integration-t3-i2 -->
- [ ] Übertrage und hake das Ergebnis erst nach der ärztlich erlaubten Bildschirmfreigabe ab <!-- capacity-w2-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 3 — C4, Datenfluss und Modulgrenzen

- **فاز:** Design 2: Systemarchitektur
- **هدف هفته:** Systemstruktur von Context bis Component sowie Modulverträge werden vor der Implementierung fixiert.
- **خروجی الزامی هفته:** `week-03-integration-evidence.md` (روز `capacity-w3-integration`)
- **بازه:** 2026-09-18 تا 2026-09-24

### روز 1 — 2026-09-18 — Component Diagram und M1–M3

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w2-d3` |
| حالت کار | Paper-only |
| نوع | project |
| ماژول | Architecture / Components |
| خروجی روز | `c4-components.dsl` |
| منبع‌ها | Gandhi et al. 2025: Repository-Level Code Search؛ [C4 Model: Context-, Container- und Component-Diagramme](https://c4model.com/diagrams)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 3.1 bis 3.6, 10 |

**دلیل:** Extraktion, Evidenzmodellierung und Retrieval benötigen überschneidungsfreie Verantwortungen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 8 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: Lexical baseline.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-08-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [C4 model diagrams](https://c4model.com/diagrams) — C4 Model، 15 دقیقه
  - **بخوان:** System Context, Container und Component diagram; Code diagram nur bei echtem Mehrwert.
  - **به‌کار ببر:** Wähle genau die Zoomstufe des Tages und beschrifte Personen, Systeme, Container und Beziehungen.
- [Maintain an architecture decision record](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Implement an ADR und Suggested characteristics of an individual record.
  - **به‌کار ببر:** Dokumentiere Kontext, Optionen, Entscheidung, Trade-offs, Status und Confidence.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Formuliere die Verantwortung von M1, M2 und M3 in je einem Satz <!-- w2-d3-t1-i1 -->
- [ ] Richte erlaubte Modulabhängigkeiten aus <!-- w2-d3-t1-i2 -->
- [ ] Entferne jeden Abhängigkeitszyklus <!-- w2-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte auf Papier mit § 3.1 bis 3.6, § 10 <!-- w2-d3-t2-i1 -->
- [ ] Skizziere ein reales Beispiel oder Fixture für Architecture / Components ohne Bildschirm <!-- w2-d3-t2-i2 -->
- [ ] Markiere, welcher rückverfolgbare Beleg nach der Bildschirmfreigabe geprüft werden muss <!-- w2-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Entwirf das Tagesergebnis auf Papier: c4-components.dsl <!-- w2-d3-t3-i1 -->
- [ ] Notiere Testidee, Akzeptanzkriterium und offene Bildschirmprüfung getrennt <!-- w2-d3-t3-i2 -->
- [ ] Übertrage und hake das Ergebnis erst nach der ärztlich erlaubten Bildschirmfreigabe ab <!-- w2-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-09-21 — End-to-End- und Sequenzfluss

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w2-d4` |
| حالت کار | Paper-only |
| نوع | project |
| ماژول | Architecture / Dynamic View |
| خروجی روز | `e2e-sequence.mmd` |
| منبع‌ها | Gandhi et al. 2025: Repository-Level Code Search؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view) |
| بخش‌های Exposé | 3, 10.2, 27 |

**دلیل:** Ein reales Szenario muss von Source Code bis zur Antwort mit Evidenz verfolgbar sein.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 8 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Neural reranking.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Neural reranking“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-08-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [C4 model diagrams](https://c4model.com/diagrams) — C4 Model، 15 دقیقه
  - **بخوان:** System Context, Container und Component diagram; Code diagram nur bei echtem Mehrwert.
  - **به‌کار ببر:** Wähle genau die Zoomstufe des Tages und beschrifte Personen, Systeme, Container und Beziehungen.
- [Maintain an architecture decision record](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Implement an ADR und Suggested characteristics of an individual record.
  - **به‌کار ببر:** Dokumentiere Kontext, Optionen, Entscheidung, Trade-offs, Status und Confidence.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Zeichne Repository→Facts→Evidence→Graph→Answer <!-- w2-d4-t1-i1 -->
- [ ] Markiere Erzeugungspunkte der SourceLocation <!-- w2-d4-t1-i2 -->
- [ ] Dokumentiere Failure- und Refusal-Punkte <!-- w2-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte auf Papier mit § 3, § 10.2, § 27 <!-- w2-d4-t2-i1 -->
- [ ] Skizziere ein reales Beispiel oder Fixture für Architecture / Dynamic View ohne Bildschirm <!-- w2-d4-t2-i2 -->
- [ ] Markiere, welcher rückverfolgbare Beleg nach der Bildschirmfreigabe geprüft werden muss <!-- w2-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Entwirf das Tagesergebnis auf Papier: e2e-sequence.mmd <!-- w2-d4-t3-i1 -->
- [ ] Notiere Testidee, Akzeptanzkriterium und offene Bildschirmprüfung getrennt <!-- w2-d4-t3-i2 -->
- [ ] Übertrage und hake das Ergebnis erst nach der ärztlich erlaubten Bildschirmfreigabe ab <!-- w2-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-09-22 — Verträge zwischen Modulen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w2-d5` |
| حالت کار | Paper-only |
| نوع | project |
| ماژول | Architecture / Contracts |
| خروجی روز | `module-contracts-v1.md` |
| منبع‌ها | Gandhi et al. 2025: Repository-Level Code Search؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view) |
| بخش‌های Exposé | 3.2, 3.5, 38.2 |

**دلیل:** Stabile Verträge ermöglichen unabhängige Tests von Extractor, Storage und Retrieval.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 8 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Repository-level evaluation metrics.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Repository-level evaluation metrics“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-08-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [C4 model diagrams](https://c4model.com/diagrams) — C4 Model، 15 دقیقه
  - **بخوان:** System Context, Container und Component diagram; Code diagram nur bei echtem Mehrwert.
  - **به‌کار ببر:** Wähle genau die Zoomstufe des Tages und beschrifte Personen, Systeme, Container und Beziehungen.
- [Maintain an architecture decision record](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Implement an ADR und Suggested characteristics of an individual record.
  - **به‌کار ببر:** Dokumentiere Kontext, Optionen, Entscheidung, Trade-offs, Status und Confidence.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere Ein- und Ausgabe-DTOs jedes Moduls <!-- w2-d5-t1-i1 -->
- [ ] Lege Versionierung und Rückwärtskompatibilität fest <!-- w2-d5-t1-i2 -->
- [ ] Modelliere erwartete Fehler und Unresolved explizit <!-- w2-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte auf Papier mit § 3.2, § 3.5, § 38.2 <!-- w2-d5-t2-i1 -->
- [ ] Skizziere ein reales Beispiel oder Fixture für Architecture / Contracts ohne Bildschirm <!-- w2-d5-t2-i2 -->
- [ ] Markiere, welcher rückverfolgbare Beleg nach der Bildschirmfreigabe geprüft werden muss <!-- w2-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Entwirf das Tagesergebnis auf Papier: module-contracts-v1.md <!-- w2-d5-t3-i1 -->
- [ ] Notiere Testidee, Akzeptanzkriterium und offene Bildschirmprüfung getrennt <!-- w2-d5-t3-i2 -->
- [ ] Übertrage und hake das Ergebnis erst nach der ärztlich erlaubten Bildschirmfreigabe ab <!-- w2-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-09-23 — ADRs für Architekturentscheidungen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w2-d6` |
| حالت کار | Paper-only |
| نوع | project |
| ماژول | Architecture / Decisions |
| خروجی روز | `adr/0001-0003.md` |
| منبع‌ها | Gandhi et al. 2025: Repository-Level Code Search؛ [Microsoft Learn: Architecture Decision Records](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 8, 10, 37 |

**دلیل:** Begründung, verworfene Alternativen und Folgen müssen erhalten bleiben.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 8 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Repository-level evaluation metrics.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Repository-level evaluation metrics“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-08-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Maintain an architecture decision record](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Implement an ADR und Suggested characteristics of an individual record.
  - **به‌کار ببر:** Dokumentiere Kontext, Optionen, Entscheidung, Trade-offs, Status und Confidence.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erstelle ADRs für Roslyn, Neo4j und JSONL <!-- w2-d6-t1-i1 -->
- [ ] Beschreibe Alternativen und Trade-offs <!-- w2-d6-t1-i2 -->
- [ ] Dokumentiere Status und Confidence jeder Entscheidung <!-- w2-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte auf Papier mit § 8, § 10, § 37 <!-- w2-d6-t2-i1 -->
- [ ] Skizziere ein reales Beispiel oder Fixture für Architecture / Decisions ohne Bildschirm <!-- w2-d6-t2-i2 -->
- [ ] Markiere, welcher rückverfolgbare Beleg nach der Bildschirmfreigabe geprüft werden muss <!-- w2-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Entwirf das Tagesergebnis auf Papier: adr/0001-0003.md <!-- w2-d6-t3-i1 -->
- [ ] Notiere Testidee, Akzeptanzkriterium und offene Bildschirmprüfung getrennt <!-- w2-d6-t3-i2 -->
- [ ] Übertrage und hake das Ergebnis erst nach der ärztlich erlaubten Bildschirmfreigabe ab <!-- w2-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-09-24 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w3-integration` |
| حالت کار | Paper-only |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-03-integration-evidence.md` |
| منبع‌ها | Gandhi et al. 2025: Repository-Level Code Search؛ [C4 Model: Context-, Container- und Component-Diagramme](https://c4model.com/diagrams)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view)؛ [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view) |
| بخش‌های Exposé | 3.1 bis 3.6, 10, 3, 10.2 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 8: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-08-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [C4 model diagrams](https://c4model.com/diagrams) — C4 Model، 15 دقیقه
  - **بخوان:** System Context, Container und Component diagram; Code diagram nur bei echtem Mehrwert.
  - **به‌کار ببر:** Wähle genau die Zoomstufe des Tages und beschrifte Personen, Systeme, Container und Beziehungen.
- [Maintain an architecture decision record](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Implement an ADR und Suggested characteristics of an individual record.
  - **به‌کار ببر:** Dokumentiere Kontext, Optionen, Entscheidung, Trade-offs, Status und Confidence.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w3-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w3-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w3-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte auf Papier mit § 3.1 bis 3.6, § 10, § 3, § 10.2 <!-- capacity-w3-integration-t2-i1 -->
- [ ] Skizziere ein reales Beispiel oder Fixture für Weekly Integration / Evidence ohne Bildschirm <!-- capacity-w3-integration-t2-i2 -->
- [ ] Markiere, welcher rückverfolgbare Beleg nach der Bildschirmfreigabe geprüft werden muss <!-- capacity-w3-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Entwirf das Tagesergebnis auf Papier: week-03-integration-evidence.md <!-- capacity-w3-integration-t3-i1 -->
- [ ] Notiere Testidee, Akzeptanzkriterium und offene Bildschirmprüfung getrennt <!-- capacity-w3-integration-t3-i2 -->
- [ ] Übertrage und hake das Ergebnis erst nach der ärztlich erlaubten Bildschirmfreigabe ab <!-- capacity-w3-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 4 — Gemeinsame Sprache, Program Graph und Provenance

- **فاز:** Design 3: Domänen- und Evidenzmodell
- **هدف هفته:** Entitäten, Beziehungen, Evidenz und Unsicherheitsstatus werden schriftlich und in JSON-Beispielen fixiert.
- **خروجی الزامی هفته:** `week-04-integration-evidence.md` (روز `capacity-w4-integration`)
- **بازه:** 2026-09-25 تا 2026-10-08

### روز 1 — 2026-09-25 — Domänenglossar

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w3-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Domain Model |
| خروجی روز | `domain-glossary.md` |
| منبع‌ها | [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 2, 3.2, 3.3 |

**دلیل:** Gemeinsame Begriffe verhindern Bedeutungsunterschiede zwischen Text, Code und Graph.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 9 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: Sequential versus graph code representation.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-09-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere Fact, Evidence, Claim und Path getrennt <!-- w3-d1-t1-i1 -->
- [ ] Präzisiere Repository, Project, File, Type und Method <!-- w3-d1-t1-i2 -->
- [ ] Operationalisiere READ, WRITE und Persistence <!-- w3-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 2, § 3.2, § 3.3 <!-- w3-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Domain Model aus <!-- w3-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w3-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: domain-glossary.md <!-- w3-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w3-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w3-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-09-28 — Node Types des Program Graph

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w3-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Graph Model |
| خروجی روز | `node-catalog-v1.yaml` |
| منبع‌ها | [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740)؛ [Yamaguchi et al. 2014: Code Property Graphs](https://drive.google.com/file/d/1SGWMjZA8Im9fXsuZxr6KnKdgijDH4o8r/view) |
| بخش‌های Exposé | 3.3, 10.3 |

**دلیل:** Nodes sollen Projektfragen dienen und nicht den gesamten AST kopieren.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 9 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Embedding and message passing.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Embedding and message passing“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-09-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [What is a graph database?](https://neo4j.com/docs/getting-started/graph-database/) — Neo4j Documentation، 15 دقیقه
  - **بخوان:** Nodes, relationships, properties, data model, indexes und constraints.
  - **به‌کار ببر:** Entscheide, was Entität, Beziehung oder Property ist, und begründe es mit einer Projektfrage.
- [Get started with Cypher](https://neo4j.com/docs/getting-started/cypher/intro-tutorial/) — Neo4j Documentation، 20 دقیقه
  - **بخوان:** Create the Movie Graph und die ersten MATCH-, CREATE- und MERGE-Beispiele.
  - **به‌کار ببر:** Übertrage das Muster auf Evidence-Nodes und gerichtete Beziehungen; teste Idempotenz mit MERGE.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Liste Nodes von Repository bis Table <!-- w3-d2-t1-i1 -->
- [ ] Bestimme notwendige Identität und Properties jedes Nodes <!-- w3-d2-t1-i2 -->
- [ ] Entferne Nodes ohne Nutzen für die Forschungsfragen <!-- w3-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.3, § 10.3 <!-- w3-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Graph Model aus <!-- w3-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w3-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: node-catalog-v1.yaml <!-- w3-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w3-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w3-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-10-06 — Relationship Types

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w3-d3` |
| حالت کار | Paper-only |
| نوع | project |
| ماژول | Graph Model |
| خروجی روز | `relationship-catalog-v1.yaml` |
| منبع‌ها | [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740)؛ [Yamaguchi et al. 2014: Code Property Graphs](https://drive.google.com/file/d/1SGWMjZA8Im9fXsuZxr6KnKdgijDH4o8r/view)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view) |
| بخش‌های Exposé | 3.3, 10.3, 38.5 |

**دلیل:** Jede Kante benötigt klare Richtung, Bedeutung, Quelle und Erzeugungsregel.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 9 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Evaluation limits.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Evaluation limits“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-09-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [What is a graph database?](https://neo4j.com/docs/getting-started/graph-database/) — Neo4j Documentation، 15 دقیقه
  - **بخوان:** Nodes, relationships, properties, data model, indexes und constraints.
  - **به‌کار ببر:** Entscheide, was Entität, Beziehung oder Property ist, und begründe es mit einer Projektfrage.
- [Get started with Cypher](https://neo4j.com/docs/getting-started/cypher/intro-tutorial/) — Neo4j Documentation، 20 دقیقه
  - **بخوان:** Create the Movie Graph und die ersten MATCH-, CREATE- und MERGE-Beispiele.
  - **به‌کار ببر:** Übertrage das Muster auf Evidence-Nodes und gerichtete Beziehungen; teste Idempotenz mit MERGE.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere DEFINES, INVOKES und MAPS_TO <!-- w3-d3-t1-i1 -->
- [ ] Definiere MUTATES, PERSISTS, READS_FROM und WRITES_TO <!-- w3-d3-t1-i2 -->
- [ ] Kennzeichne jede Beziehung als DIRECT oder DERIVED <!-- w3-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte auf Papier mit § 3.3, § 10.3, § 38.5 <!-- w3-d3-t2-i1 -->
- [ ] Skizziere ein reales Beispiel oder Fixture für Graph Model ohne Bildschirm <!-- w3-d3-t2-i2 -->
- [ ] Markiere, welcher rückverfolgbare Beleg nach der Bildschirmfreigabe geprüft werden muss <!-- w3-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Entwirf das Tagesergebnis auf Papier: relationship-catalog-v1.yaml <!-- w3-d3-t3-i1 -->
- [ ] Notiere Testidee, Akzeptanzkriterium und offene Bildschirmprüfung getrennt <!-- w3-d3-t3-i2 -->
- [ ] Übertrage und hake das Ergebnis erst nach der ärztlich erlaubten Bildschirmfreigabe ab <!-- w3-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-10-07 — EvidenceRecord und SourceLocation

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w3-d4` |
| حالت کار | Paper-only |
| نوع | project |
| ماژول | Evidence Model |
| خروجی روز | `evidence-record.schema.json` |
| منبع‌ها | [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view) |
| بخش‌های Exposé | 3.2, 38.4 bis 38.6 |

**دلیل:** Ohne Datei, Zeile und Regel ist kein Claim prüfbar.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 9 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Evaluation limits.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Evaluation limits“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-09-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Bestimme die Felder des EvidenceRecord <!-- w3-d4-t1-i1 -->
- [ ] Mache Repository, Commit, File und Line verpflichtend <!-- w3-d4-t1-i2 -->
- [ ] Ergänze RuleId, RuleVersion und ExtractorVersion <!-- w3-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte auf Papier mit § 3.2, § 38.4 bis 38.6 <!-- w3-d4-t2-i1 -->
- [ ] Skizziere ein reales Beispiel oder Fixture für Evidence Model ohne Bildschirm <!-- w3-d4-t2-i2 -->
- [ ] Markiere, welcher rückverfolgbare Beleg nach der Bildschirmfreigabe geprüft werden muss <!-- w3-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Entwirf das Tagesergebnis auf Papier: evidence-record.schema.json <!-- w3-d4-t3-i1 -->
- [ ] Notiere Testidee, Akzeptanzkriterium und offene Bildschirmprüfung getrennt <!-- w3-d4-t3-i2 -->
- [ ] Übertrage und hake das Ergebnis erst nach der ärztlich erlaubten Bildschirmfreigabe ab <!-- w3-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-10-08 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w4-integration` |
| حالت کار | Paper-only |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-04-integration-evidence.md` |
| منبع‌ها | [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Yamaguchi et al. 2014: Code Property Graphs](https://drive.google.com/file/d/1SGWMjZA8Im9fXsuZxr6KnKdgijDH4o8r/view)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view) |
| بخش‌های Exposé | 2, 3.2, 3.3, 10.3 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 9: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-09-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w4-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w4-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w4-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte auf Papier mit § 2, § 3.2, § 3.3, § 10.3 <!-- capacity-w4-integration-t2-i1 -->
- [ ] Skizziere ein reales Beispiel oder Fixture für Weekly Integration / Evidence ohne Bildschirm <!-- capacity-w4-integration-t2-i2 -->
- [ ] Markiere, welcher rückverfolgbare Beleg nach der Bildschirmfreigabe geprüft werden muss <!-- capacity-w4-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Entwirf das Tagesergebnis auf Papier: week-04-integration-evidence.md <!-- capacity-w4-integration-t3-i1 -->
- [ ] Notiere Testidee, Akzeptanzkriterium und offene Bildschirmprüfung getrennt <!-- capacity-w4-integration-t3-i2 -->
- [ ] Übertrage und hake das Ergebnis erst nach der ärztlich erlaubten Bildschirmfreigabe ab <!-- capacity-w4-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 5 — Gemeinsame Sprache, Program Graph und Provenance → Goldstandard, RQ1/RQ2 und Teststrategie

- **فاز:** Design 3: Domänen- und Evidenzmodell / Design 4: Test und Evaluation
- **هدف هفته:** Entitäten, Beziehungen, Evidenz und Unsicherheitsstatus werden schriftlich und in JSON-Beispielen fixiert. Vor dem Bau des Artefakts wird die Messung von Erfolg und Scheitern vollständig definiert.
- **خروجی الزامی هفته:** `week-05-integration-evidence.md` (روز `capacity-w5-integration`)
- **بازه:** 2026-10-09 تا 2026-10-15

### روز 1 — 2026-10-09 — Unsicherheit und Answer Status

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w3-d5` |
| حالت کار | Paper-only |
| نوع | project |
| ماژول | Verifier / Status Model |
| خروجی روز | `evidence-and-answer-status.yaml` |
| منبع‌ها | [Feng et al. 2020: CodeBERT](https://aclanthology.org/2020.findings-emnlp.139/)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) |
| بخش‌های Exposé | 3.6, 14.3, 27 |

**دلیل:** Das System muss Nichtwissen modellieren und erfundene Antworten verhindern.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 10 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: Natural-language/code pretraining.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-10-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere OBSERVED, DERIVED, UNRESOLVED und CONFLICTING <!-- w3-d5-t1-i1 -->
- [ ] Definiere SUPPORTED, PARTIALLY_SUPPORTED und NOT_ANSWERABLE <!-- w3-d5-t1-i2 -->
- [ ] Formuliere die Regel von Evidenz zu Answer Status <!-- w3-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte auf Papier mit § 3.6, § 14.3, § 27 <!-- w3-d5-t2-i1 -->
- [ ] Skizziere ein reales Beispiel oder Fixture für Verifier / Status Model ohne Bildschirm <!-- w3-d5-t2-i2 -->
- [ ] Markiere, welcher rückverfolgbare Beleg nach der Bildschirmfreigabe geprüft werden muss <!-- w3-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Entwirf das Tagesergebnis auf Papier: evidence-and-answer-status.yaml <!-- w3-d5-t3-i1 -->
- [ ] Notiere Testidee, Akzeptanzkriterium und offene Bildschirmprüfung getrennt <!-- w3-d5-t3-i2 -->
- [ ] Übertrage und hake das Ergebnis erst nach der ärztlich erlaubten Bildschirmfreigabe ab <!-- w3-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-10-12 — Ausführbarer Vertical Slice

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w3-d6` |
| حالت کار | Paper-only |
| نوع | project |
| ماژول | Walking Skeleton / Evidence |
| خروجی روز | `vertical-slice-v0.jsonl + golden test` |
| منبع‌ها | [Feng et al. 2020: CodeBERT](https://aclanthology.org/2020.findings-emnlp.139/)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource)؛ [Microsoft Learn: Roslyn Syntax Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/syntax-analysis) |
| بخش‌های Exposé | 10.2, 12, 17, 26 |

**دلیل:** Ein früher ausführbarer Pfad zeigt Modell- und Integrationsfehler, bevor sechs reine Designwochen vergehen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 10 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Encoder embeddings.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Encoder embeddings“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-10-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Extrahiere einen realen Controller→Service→Repository-Pfad mit Roslyn <!-- w3-d6-t1-i1 -->
- [ ] Schreibe EvidenceRecord und SourceLocation deterministisch als JSONL <!-- w3-d6-t1-i2 -->
- [ ] Führe einen Golden Test aus und markiere Lücken in Schema und Contract <!-- w3-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte auf Papier mit § 10.2, § 12, § 17, § 26 <!-- w3-d6-t2-i1 -->
- [ ] Skizziere ein reales Beispiel oder Fixture für Walking Skeleton / Evidence ohne Bildschirm <!-- w3-d6-t2-i2 -->
- [ ] Markiere, welcher rückverfolgbare Beleg nach der Bildschirmfreigabe geprüft werden muss <!-- w3-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Entwirf das Tagesergebnis auf Papier: vertical-slice-v0.jsonl + golden test <!-- w3-d6-t3-i1 -->
- [ ] Notiere Testidee, Akzeptanzkriterium und offene Bildschirmprüfung getrennt <!-- w3-d6-t3-i2 -->
- [ ] Übertrage und hake das Ergebnis erst nach der ärztlich erlaubten Bildschirmfreigabe ab <!-- w3-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-10-13 — Akzeptanzkriterien des Gesamtsystems

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w4-d1` |
| حالت کار | Paper-only |
| نوع | project |
| ماژول | Evaluation / Acceptance |
| خروجی روز | `system-acceptance-criteria.md` |
| منبع‌ها | [Feng et al. 2020: CodeBERT](https://aclanthology.org/2020.findings-emnlp.139/)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view) |
| بخش‌های Exposé | 16, 17, 20 |

**دلیل:** Die Definition of Done muss von Evidenz und Forschungsfragen abhängen, nicht vom guten Eindruck einer Demo.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 10 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Code-search use and limits.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Code-search use and limits“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-10-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Acceptance criteria: definition, examples and tips](https://www.atlassian.com/work-management/project-management/acceptance-criteria) — Atlassian، 12 دقیقه
  - **بخوان:** Acceptance criteria vs. user story und die Beispiele für klare, messbare Bedingungen.
  - **به‌کار ببر:** Formuliere Erfolg als beobachtbare Bedingung; vermeide Formulierungen wie ‚funktioniert gut‘.
- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Extrahiere die Erfolgskriterien des Artefakts <!-- w4-d1-t1-i1 -->
- [ ] Trenne verpflichtende und sekundäre Metriken <!-- w4-d1-t1-i2 -->
- [ ] Markiere Schwellenwerte, die Betreuungsgenehmigung benötigen <!-- w4-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte auf Papier mit § 16, § 17, § 20 <!-- w4-d1-t2-i1 -->
- [ ] Skizziere ein reales Beispiel oder Fixture für Evaluation / Acceptance ohne Bildschirm <!-- w4-d1-t2-i2 -->
- [ ] Markiere, welcher rückverfolgbare Beleg nach der Bildschirmfreigabe geprüft werden muss <!-- w4-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Entwirf das Tagesergebnis auf Papier: system-acceptance-criteria.md <!-- w4-d1-t3-i1 -->
- [ ] Notiere Testidee, Akzeptanzkriterium und offene Bildschirmprüfung getrennt <!-- w4-d1-t3-i2 -->
- [ ] Übertrage und hake das Ergebnis erst nach der ärztlich erlaubten Bildschirmfreigabe ab <!-- w4-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-10-14 — Annotationsprotokoll entwerfen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w4-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / Gold |
| خروجی روز | `annotation-guideline-v1.md` |
| منبع‌ها | [Feng et al. 2020: CodeBERT](https://aclanthology.org/2020.findings-emnlp.139/)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view) |
| بخش‌های Exposé | 12, 13.3, 29.4 |

**دلیل:** Der Goldstandard ist nur mit stabiler Annotationseinheit und Anleitung valide.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 10 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Code-search use and limits.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Code-search use and limits“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-10-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Configure a labeling interface](https://labelstud.io/guide/setup) — Label Studio Documentation، 15 دقیقه
  - **بخوان:** Set up the labeling interface und Example labeling config.
  - **به‌کار ببر:** Definiere Einheit, Labels, Positiv/Negativ-Beispiele und erlaubte Entscheidungen vor der Annotation.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere die Einheiten Method, Table und Relation <!-- w4-d2-t1-i1 -->
- [ ] Definiere Positive, Negative und Hard Negative <!-- w4-d2-t1-i2 -->
- [ ] Beschreibe Disagreement- und Zweitprüfungsprozess <!-- w4-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 12, § 13.3, § 29.4 <!-- w4-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / Gold aus <!-- w4-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w4-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: annotation-guideline-v1.md <!-- w4-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w4-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w4-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-10-15 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w5-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-05-integration-evidence.md` |
| منبع‌ها | [Feng et al. 2020: CodeBERT](https://aclanthology.org/2020.findings-emnlp.139/)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource)؛ [Microsoft Learn: Roslyn Syntax Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/syntax-analysis) |
| بخش‌های Exposé | 3.6, 14.3, 27, 10.2 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 10: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-10-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w5-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w5-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w5-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.6, § 14.3, § 27, § 10.2 <!-- capacity-w5-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w5-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w5-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-05-integration-evidence.md <!-- capacity-w5-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w5-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w5-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 6 — Goldstandard, RQ1/RQ2 und Teststrategie

- **فاز:** Design 4: Test und Evaluation
- **هدف هفته:** Vor dem Bau des Artefakts wird die Messung von Erfolg und Scheitern vollständig definiert.
- **خروجی الزامی هفته:** `week-06-integration-evidence.md` (روز `capacity-w6-integration`)
- **بازه:** 2026-10-16 تا 2026-10-22

### روز 1 — 2026-10-16 — Experiment A für RQ1 entwerfen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w4-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / RQ1 |
| خروجی روز | `rq1-experiment-design.md` |
| منبع‌ها | Zhang et al. 2024: Survey on LLMs for Software Engineering؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view) |
| بخش‌های Exposé | 7.1, 13, 14.1 |

**دلیل:** Precision, Recall und F1 müssen auf zählbaren Fakten berechnet werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 11 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: Model taxonomy.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-11-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Bestimme die Extraktionseinheiten <!-- w4-d3-t1-i1 -->
- [ ] Formuliere TP/FP/FN-Regeln für jede Relation <!-- w4-d3-t1-i2 -->
- [ ] Trenne Macro- und Micro-Reporting <!-- w4-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.1, § 13, § 14.1 <!-- w4-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / RQ1 aus <!-- w4-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w4-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: rq1-experiment-design.md <!-- w4-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w4-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w4-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-10-19 — Experiment B für RQ2 entwerfen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w4-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / RQ2 |
| خروجی روز | `rq2-experiment-design.md` |
| منبع‌ها | Zhang et al. 2024: Survey on LLMs for Software Engineering؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) |
| بخش‌های Exposé | 7.2, 14.2 bis 14.3, 29.3 |

**دلیل:** Flat und Graph müssen mit denselben Fragen, demselben Corpus und k verglichen werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 11 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Fine-tuning and prompting.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Fine-tuning and prompting“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-11-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere unabhängige Variable und Konstanten <!-- w4-d4-t1-i1 -->
- [ ] Operationalisiere Answer Correctness und Evidence Completeness <!-- w4-d4-t1-i2 -->
- [ ] Definiere Path Validity und Correct Refusal <!-- w4-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.2, § 14.2 bis 14.3, § 29.3 <!-- w4-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / RQ2 aus <!-- w4-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w4-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: rq2-experiment-design.md <!-- w4-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w4-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w4-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-10-20 — Testpyramide und Fixture-Strategie

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w4-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Quality / Test Design |
| خروجی روز | `test-strategy.md` |
| منبع‌ها | Zhang et al. 2024: Survey on LLMs for Software Engineering؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Microsoft Learn: Roslyn Syntax Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/syntax-analysis) |
| بخش‌های Exposé | 17, 38.10 |

**دلیل:** Die meisten Fehler sollen vor dem vollständigen Lauf durch kleine deterministische Tests auffallen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 11 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Software-engineering limitations.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Software-engineering limitations“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-11-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Trenne Unit-, Golden-, Integrations- und E2E-Tests <!-- w4-d5-t1-i1 -->
- [ ] Entwirf Fixtures für Roslyn und EF <!-- w4-d5-t1-i2 -->
- [ ] Dokumentiere deterministische Reihenfolge und Snapshot-Richtlinie <!-- w4-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 17, § 38.10 <!-- w4-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Quality / Test Design aus <!-- w4-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w4-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: test-strategy.md <!-- w4-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w4-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w4-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-10-21 — Threats to Validity vor der Ausführung

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w4-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / Validity |
| خروجی روز | `pre-registered-validity-risks.md` |
| منبع‌ها | Zhang et al. 2024: Survey on LLMs for Software Engineering؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view) |
| بخش‌های Exposé | 18 |

**دلیل:** Risiken werden vor Sichtung der Ergebnisse festgehalten, um gerichtete Interpretation zu vermeiden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 11 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Software-engineering limitations.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Software-engineering limitations“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-11-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [The Methodology](https://libguides.usc.edu/writingguide/methodology) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Methodology Section und Structure and Writing Style.
  - **به‌کار ببر:** Beschreibe Auswahl, Werkzeug, Ablauf, Messung und Begründung so, dass der Versuch wiederholbar ist.
- [Conducting Research](https://owl.purdue.edu/owl/research_and_citation/conducting_research/index.html) — Purdue Online Writing Lab، 15 دقیقه
  - **بخوان:** Starting the Research Process und Choosing a Topic; nutze nur die Schritte von Problem zu fokussierbarer Frage.
  - **به‌کار ببر:** Formuliere Problem, Ziel und geplanten Beleg getrennt, bevor du das Tagesartefakt beginnst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Dokumentiere Construct- und Internal-Threats <!-- w4-d6-t1-i1 -->
- [ ] Dokumentiere External- und Conclusion-Threats <!-- w4-d6-t1-i2 -->
- [ ] Erfasse Mitigation und Restrisiko jedes Punkts <!-- w4-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 18 <!-- w4-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / Validity aus <!-- w4-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w4-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: pre-registered-validity-risks.md <!-- w4-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w4-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w4-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-10-22 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w6-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-06-integration-evidence.md` |
| منبع‌ها | Zhang et al. 2024: Survey on LLMs for Software Engineering؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view)؛ [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) |
| بخش‌های Exposé | 7.1, 13, 14.1, 7.2 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 11: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-11-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w6-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w6-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w6-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.1, § 13, § 14.1, § 7.2 <!-- capacity-w6-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w6-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w6-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-06-integration-evidence.md <!-- capacity-w6-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w6-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w6-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 7 — Corpus, Repository-Struktur und technisches Backlog

- **فاز:** Design 5: Umsetzungsplan
- **هدف هفته:** Das Design wird in einen versionierten, planbaren und eindeutigen Umsetzungsplan überführt.
- **خروجی الزامی هفته:** `week-07-integration-evidence.md` (روز `capacity-w7-integration`)
- **بازه:** 2026-10-23 تا 2026-10-29

### روز 1 — 2026-10-23 — Corpus Manifest und Freeze Plan

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w5-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Delivery / Corpus |
| خروجی روز | `corpus-manifest-v1.yaml` |
| منبع‌ها | Hou et al. 2024: LLMs for Software Engineering Review؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 9.2 bis 9.3, 11.3 |

**دلیل:** Eine feste Eingabe ist Voraussetzung für reproduzierbare Ergebnisse.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 12 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: RNN/LSTM/GRU position.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-12-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Dokumentiere den festen Danphe-Commit <!-- w5-d1-t1-i1 -->
- [ ] Bestimme Solutions und Projects im Scope <!-- w5-d1-t1-i2 -->
- [ ] Dokumentiere Lizenz, Build und Ausschlüsse <!-- w5-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 9.2 bis 9.3, § 11.3 <!-- w5-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Delivery / Corpus aus <!-- w5-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w5-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: corpus-manifest-v1.yaml <!-- w5-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w5-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w5-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-10-26 — Repository- und Ordnerstruktur

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w5-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Delivery / Repository |
| خروجی روز | `repository-layout.md` |
| منبع‌ها | Hou et al. 2024: LLMs for Software Engineering Review؛ [arc42: Vorlage zur Softwarearchitektur-Dokumentation](https://arc42.org/overview/)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 10, 11, 17 |

**دلیل:** Die Dateistruktur muss Architekturgrenzen und Testzyklus widerspiegeln.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 12 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: LLM use in software engineering.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „LLM use in software engineering“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-12-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Entwirf src, tests, corpus, gold und reports <!-- w5-d2-t1-i1 -->
- [ ] Ordne jedem Ordner ein verantwortliches Modul zu <!-- w5-d2-t1-i2 -->
- [ ] Trenne generierte Ausgabe vom Quellcode <!-- w5-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 10, § 11, § 17 <!-- w5-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Delivery / Repository aus <!-- w5-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w5-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: repository-layout.md <!-- w5-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w5-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w5-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-10-27 — Build, Versionierung und Reproduktion

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w5-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Delivery / Reproduction |
| خروجی روز | `reproduction-plan.md` |
| منبع‌ها | Hou et al. 2024: LLMs for Software Engineering Review؛ [Microsoft Learn: Architecture Decision Records](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 11.3, 17, 38.11 |

**دلیل:** Jeder Lauf muss vom ersten Tag an mit Konfiguration und Version reproduzierbar sein.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 12 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Validity and open problems.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Validity and open problems“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-12-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Dokumentiere Versionen von Toolchain und Abhängigkeiten <!-- w5-d3-t1-i1 -->
- [ ] Entwirf RunId, ConfigHash und CorpusCommit <!-- w5-d3-t1-i2 -->
- [ ] Definiere Befehle für Clean Build, Test und Run <!-- w5-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 11.3, § 17, § 38.11 <!-- w5-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Delivery / Reproduction aus <!-- w5-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w5-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: reproduction-plan.md <!-- w5-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w5-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w5-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-10-28 — Abhängigkeitsgraph und Implementierungsreihenfolge

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w5-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Delivery / Roadmap |
| خروجی روز | `implementation-dependency-map.mmd` |
| منبع‌ها | Hou et al. 2024: LLMs for Software Engineering Review؛ [C4 Model: Context-, Container- und Component-Diagramme](https://c4model.com/diagrams)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 10, 20 |

**دلیل:** Arbeit wird nach technischen Abhängigkeiten statt nach Technologieattraktivität geordnet.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 12 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Validity and open problems.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Validity and open problems“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-12-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Überführe M1, M2, M3 und Evaluation in Meilensteine <!-- w5-d4-t1-i1 -->
- [ ] Zeichne Abhängigkeiten und kritischen Pfad <!-- w5-d4-t1-i2 -->
- [ ] Kennzeichne parallele und blockierte Arbeit <!-- w5-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 10, § 20 <!-- w5-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Delivery / Roadmap aus <!-- w5-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w5-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: implementation-dependency-map.mmd <!-- w5-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w5-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w5-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-10-29 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w7-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-07-integration-evidence.md` |
| منبع‌ها | Hou et al. 2024: LLMs for Software Engineering Review؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [arc42: Vorlage zur Softwarearchitektur-Dokumentation](https://arc42.org/overview/)؛ [Microsoft Learn: Architecture Decision Records](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record) |
| بخش‌های Exposé | 9.2 bis 9.3, 11.3, 10, 11 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 12: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-12-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w7-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w7-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w7-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 9.2 bis 9.3, § 11.3, § 10, § 11 <!-- capacity-w7-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w7-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w7-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-07-integration-evidence.md <!-- capacity-w7-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w7-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w7-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 8 — Corpus, Repository-Struktur und technisches Backlog → Traceability, Baseline und technische Bereitschaft

- **فاز:** Design 5: Umsetzungsplan / Design 6: Finalisierung
- **هدف هفته:** Das Design wird in einen versionierten, planbaren und eindeutigen Umsetzungsplan überführt. Das Design wird versioniert; danach sind nur kontrollierte Änderungen erlaubt.
- **خروجی الزامی هفته:** `week-08-integration-evidence.md` (روز `capacity-w8-integration`)
- **بازه:** 2026-10-30 تا 2026-11-05

### روز 1 — 2026-10-30 — Backlog mit Definition of Done

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w5-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Delivery / Backlog |
| خروجی روز | `technical-backlog-v1.csv` |
| منبع‌ها | [Lewis et al. 2020: Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view) |
| بخش‌های Exposé | 8, 16, 20 |

**دلیل:** Jede Story benötigt Ergebnis, Test und Beziehung zu einer Forschungsfrage.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 13 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: Seq2Seq RAG architecture.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-13-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Acceptance criteria: definition, examples and tips](https://www.atlassian.com/work-management/project-management/acceptance-criteria) — Atlassian، 12 دقیقه
  - **بخوان:** Acceptance criteria vs. user story und die Beispiele für klare, messbare Bedingungen.
  - **به‌کار ببر:** Formuliere Erfolg als beobachtbare Bedingung; vermeide Formulierungen wie ‚funktioniert gut‘.
- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Zerlege Epics in Stories von höchstens zwei Tagen <!-- w5-d5-t1-i1 -->
- [ ] Ergänze Akzeptanzkriterien und Evidenzartefakt <!-- w5-d5-t1-i2 -->
- [ ] Wende die Scope-Labels Core, Extension und Future an <!-- w5-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 8, § 16, § 20 <!-- w5-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Delivery / Backlog aus <!-- w5-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w5-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: technical-backlog-v1.csv <!-- w5-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w5-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w5-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-11-02 — Design Review Version 1

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w5-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Design / Review |
| خروجی روز | `design-review-v1.md` |
| منبع‌ها | [Lewis et al. 2020: Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)؛ [arc42: Vorlage zur Softwarearchitektur-Dokumentation](https://arc42.org/overview/)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 16, 20, 38 |

**دلیل:** Ein Gesamtüberblick deckt Widersprüche zwischen Anforderung, Architektur, Modell und Evaluation auf.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 13 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Parametric versus retrieved memory.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Parametric versus retrieved memory“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-13-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Führe das End-to-End-Szenario erneut durch <!-- w5-d6-t1-i1 -->
- [ ] Liste Traceability Gaps <!-- w5-d6-t1-i2 -->
- [ ] Gib offenen Entscheidungen eine verantwortliche Person und Frist <!-- w5-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 16, § 20, § 38 <!-- w5-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Design / Review aus <!-- w5-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w5-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: design-review-v1.md <!-- w5-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w5-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w5-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-11-03 — Vollständige Traceability Matrix

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w6-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Design / Traceability |
| خروجی روز | `traceability-matrix.csv` |
| منبع‌ها | [Lewis et al. 2020: Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view) |
| بخش‌های Exposé | 7, 16, 21 |

**دلیل:** Keine Anforderung, kein Modul, kein Test und keine Forschungsfrage darf unverbunden bleiben.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 13 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Evaluation setup.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Evaluation setup“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-13-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Verbinde Requirement→Component <!-- w6-d1-t1-i1 -->
- [ ] Verbinde Component→Test/Metric <!-- w6-d1-t1-i2 -->
- [ ] Verbinde Metric→RQ/Thesis Section <!-- w6-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7, § 16, § 21 <!-- w6-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Design / Traceability aus <!-- w6-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w6-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: traceability-matrix.csv <!-- w6-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w6-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w6-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-11-04 — Design Freeze und Readiness Gate

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w6-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Design / Baseline |
| خروجی روز | `design-baseline-2026-11-24.zip` |
| منبع‌ها | [Lewis et al. 2020: Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Microsoft Learn: Architecture Decision Records](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record)؛ [arc42: Vorlage zur Softwarearchitektur-Dokumentation](https://arc42.org/overview/) |
| بخش‌های Exposé | 16, 20, 37 |

**دلیل:** Der Designabschluss muss alle Eingaben für den unabhängigen technischen Start am 30. November bereitstellen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 13 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Evaluation setup.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Evaluation setup“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-13-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Acceptance criteria: definition, examples and tips](https://www.atlassian.com/work-management/project-management/acceptance-criteria) — Atlassian، 12 دقیقه
  - **بخوان:** Acceptance criteria vs. user story und die Beispiele für klare, messbare Bedingungen.
  - **به‌کار ببر:** Formuliere Erfolg als beobachtbare Bedingung; vermeide Formulierungen wie ‚funktioniert gut‘.
- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Schließe alle Design-Checklisten <!-- w6-d2-t1-i1 -->
- [ ] Versioniere ADRs und erlaubte offene Punkte <!-- w6-d2-t1-i2 -->
- [ ] Bereite den ersten technischen Plantag und seine Eingaben vor <!-- w6-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 16, § 20, § 37 <!-- w6-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Design / Baseline aus <!-- w6-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w6-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: design-baseline-2026-11-24.zip <!-- w6-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w6-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w6-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-11-05 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w8-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-08-integration-evidence.md` |
| منبع‌ها | [Lewis et al. 2020: Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view)؛ [arc42: Vorlage zur Softwarearchitektur-Dokumentation](https://arc42.org/overview/)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view) |
| بخش‌های Exposé | 8, 16, 20, 38 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 13: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-13-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w8-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w8-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w8-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 8, § 16, § 20, § 38 <!-- capacity-w8-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w8-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w8-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-08-integration-evidence.md <!-- capacity-w8-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w8-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w8-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 9 — Frozen Corpus und Forschungsvertrag

- **فاز:** Phase 0: Scope und Corpus
- **هدف هفته:** Ein festes Corpus, ein vertretbarer Scope und vorab definierte Fragen werden vorbereitet.
- **خروجی الزامی هفته:** `week-09-integration-evidence.md` (روز `capacity-w9-integration`)
- **بازه:** 2026-11-06 تا 2026-11-12

### روز 1 — 2026-11-06 — Ziel und zwei Forschungsfragen erneut prüfen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w7-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Docs / Research Contract |
| خروجی روز | `research-contract-v1.md` |
| منبع‌ها | [Guo et al. 2021: GraphCodeBERT](https://arxiv.org/pdf/2009.08366)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view) |
| بخش‌های Exposé | 6, 7, 11.1 |

**دلیل:** Jede spätere Implementierung muss eine der beiden Forschungsfragen direkt unterstützen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 14 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: Data-flow-guided self-attention.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-14-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [How to Write a Research Question](https://writingcenter.gmu.edu/writing-resources/research-based-writing) — George Mason University Writing Center، 12 دقیقه
  - **بخوان:** What is a research question?, Why is it essential? und Steps to developing a research question.
  - **به‌کار ببر:** Prüfe RQ1/RQ2 auf Fokus, Messbarkeit, Machbarkeit und Bezug zu einem einzigen Problem.
- [Conducting Research](https://owl.purdue.edu/owl/research_and_citation/conducting_research/index.html) — Purdue Online Writing Lab، 15 دقیقه
  - **بخوان:** Starting the Research Process und Choosing a Topic; nutze nur die Schritte von Problem zu fokussierbarer Frage.
  - **به‌کار ببر:** Formuliere Problem, Ziel und geplanten Beleg getrennt, bevor du das Tagesartefakt beginnst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Formuliere das Ziel des Artefakts in einem Satz <!-- w7-d1-t1-i1 -->
- [ ] Extrahiere die Analyseeinheit von RQ1 präzise <!-- w7-d1-t1-i2 -->
- [ ] Liste die RQ2-Metriken ohne neue Kriterien auf <!-- w7-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 6, § 7, § 11.1 <!-- w7-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Docs / Research Contract aus <!-- w7-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w7-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: research-contract-v1.md <!-- w7-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w7-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w7-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-11-09 — Danphe einfrieren

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w7-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Corpus |
| خروجی روز | `corpus-manifest.yaml` |
| منبع‌ها | [Guo et al. 2021: GraphCodeBERT](https://arxiv.org/pdf/2009.08366)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 9.3, 11.3, 38.1 |

**دلیل:** Ohne festen Commit sind die Ergebnisse nicht reproduzierbar.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 14 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Encoder representation.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Encoder representation“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-14-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Dokumentiere Commit und Submodule <!-- w7-d2-t1-i1 -->
- [ ] Ermittle Lizenz und Build-Anforderungen <!-- w7-d2-t1-i2 -->
- [ ] Definiere Pfade außerhalb des Corpus <!-- w7-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 9.3, § 11.3, § 38.1 <!-- w7-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Corpus aus <!-- w7-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w7-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: corpus-manifest.yaml <!-- w7-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w7-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w7-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-11-10 — Corpus Census

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w7-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Corpus / Census |
| خروجی روز | `corpus-census.csv` |
| منبع‌ها | [Guo et al. 2021: GraphCodeBERT](https://arxiv.org/pdf/2009.08366)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource)؛ [Microsoft Learn: Roslyn Workspace](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/work-with-workspace) |
| بخش‌های Exposé | 3.5.2, 9.2, 28 |

**دلیل:** Vor dem Extractor muss klar sein, welche Muster im Corpus tatsächlich vorkommen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 14 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Code-search evaluation.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Code-search evaluation“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-14-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Ermittle die Anzahl von Solution, Project und File <!-- w7-d3-t1-i1 -->
- [ ] Zähle DbContext und DbSet <!-- w7-d3-t1-i2 -->
- [ ] Ziehe Stichproben realer READ/WRITE-Muster <!-- w7-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.5.2, § 9.2, § 28 <!-- w7-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Corpus / Census aus <!-- w7-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w7-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: corpus-census.csv <!-- w7-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w7-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w7-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-11-11 — Core- und Extension-Scope

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w7-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Docs / Scope |
| خروجی روز | `scope-and-stop-rules.md` |
| منبع‌ها | [Guo et al. 2021: GraphCodeBERT](https://arxiv.org/pdf/2009.08366)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Alshemaimri et al. 2021: Database Code Fragments Survey](https://onlinelibrary.wiley.com/doi/full/10.1002/eng2.12441) |
| بخش‌های Exposé | 8, 31, 37 |

**دلیل:** Scope Creep muss vor der Implementierung gestoppt werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 14 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Code-search evaluation.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Code-search evaluation“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-14-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Liste die Core-Fälle auf <!-- w7-d4-t1-i1 -->
- [ ] Trenne Fälle, die von Beobachtungen im Corpus abhängen <!-- w7-d4-t1-i2 -->
- [ ] Dokumentiere Future-Fälle mit Stop Rule <!-- w7-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 8, § 31, § 37 <!-- w7-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Docs / Scope aus <!-- w7-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w7-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: scope-and-stop-rules.md <!-- w7-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w7-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w7-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-11-12 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w9-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-09-integration-evidence.md` |
| منبع‌ها | [Guo et al. 2021: GraphCodeBERT](https://arxiv.org/pdf/2009.08366)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource)؛ [Microsoft Learn: Roslyn Workspace](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/work-with-workspace) |
| بخش‌های Exposé | 6, 7, 11.1, 9.3 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 14: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-14-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w9-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w9-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w9-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 6, § 7, § 11.1, § 9.3 <!-- capacity-w9-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w9-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w9-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-09-integration-evidence.md <!-- capacity-w9-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w9-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w9-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 10 — Frozen Corpus und Forschungsvertrag → Von der Solution zur Declaration

- **فاز:** Phase 0: Scope und Corpus / Phase 1: Roslyn Syntax
- **هدف هفته:** Ein festes Corpus, ein vertretbarer Scope und vorab definierte Fragen werden vorbereitet. Dateien, Klassen und Methoden werden mit eindeutiger Source Location extrahiert.
- **خروجی الزامی هفته:** `week-10-integration-evidence.md` (روز `capacity-w10-integration`)
- **بازه:** 2026-11-13 تا 2026-11-19

### روز 1 — 2026-11-13 — Rollenbasierte Use Cases

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w7-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | QueryContracts |
| خروجی روز | `use-cases-v1.yaml` |
| منبع‌ها | [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view) |
| بخش‌های Exposé | 1.6, 25, 26 |

**دلیل:** Reale Fragen müssen vor dem Retrieval definiert werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 15 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: Provenance requirements.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-15-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Personas: Study Guide](https://www.nngroup.com/articles/personas-study-guide/) — Nielsen Norman Group، 15 دقیقه
  - **بخوان:** What Is a Persona? sowie die ersten Hinweise unter How to Create Personas.
  - **به‌کار ببر:** Beschreibe Developer, Architect und QA anhand von Ziel, Entscheidung, Kontext und Informationsbedarf statt nur anhand ihrer Jobtitel.
- [Learning about users and their needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) — GOV.UK Service Manual، 15 دقیقه
  - **بخوان:** Understanding user needs, Writing user needs und Linking user needs to user stories.
  - **به‌کار ببر:** Schreibe jeden Bedarf als Ziel und Nutzen; behandle unbelegte Annahmen ausdrücklich als Annahmen.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Überführe den Developer-Bedarf in Evidenzfelder <!-- w7-d5-t1-i1 -->
- [ ] Überführe den Architect-Bedarf in Pfade <!-- w7-d5-t1-i2 -->
- [ ] Überführe QA/Compliance in Coverage und Gaps <!-- w7-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 1.6, § 25, § 26 <!-- w7-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in QueryContracts aus <!-- w7-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w7-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: use-cases-v1.yaml <!-- w7-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w7-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w7-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-11-16 — Erster Gold-Pilot

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w7-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / Gold |
| خروجی روز | `gold/pilot-v1.jsonl` |
| منبع‌ها | [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource) |
| بخش‌های Exposé | 12, 13.3, 29.4 |

**دلیل:** Kleine positive, negative und schwierige Beispiele steuern den Extractor-Pfad.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 15 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Seq2Seq knowledge tasks.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Seq2Seq knowledge tasks“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-15-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Configure a labeling interface](https://labelstud.io/guide/setup) — Label Studio Documentation، 15 دقیقه
  - **بخوان:** Set up the labeling interface und Example labeling config.
  - **به‌کار ببر:** Definiere Einheit, Labels, Positiv/Negativ-Beispiele und erlaubte Entscheidungen vor der Annotation.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Fixiere die Annotationseinheit <!-- w7-d6-t1-i1 -->
- [ ] Wähle fünf positive und fünf negative Fälle <!-- w7-d6-t1-i2 -->
- [ ] Erstelle drei Hard Negatives aus Namensähnlichkeit <!-- w7-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 12, § 13.3, § 29.4 <!-- w7-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / Gold aus <!-- w7-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w7-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: gold/pilot-v1.jsonl <!-- w7-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w7-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w7-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-11-17 — Solution Loader

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w8-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.CSharp |
| خروجی روز | `SolutionLoader.cs + tests` |
| منبع‌ها | [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252)؛ [Microsoft Learn: Roslyn Workspace](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/work-with-workspace)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 3.1, 10.2, 38.2 |

**دلیل:** Alle Projekte müssen aus einer reproduzierbaren Eingabe geladen werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 15 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Retrieval versus generation metrics.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Retrieval versus generation metrics“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-15-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [.NET Compiler Platform SDK concepts and object model](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/compiler-api-model) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Compiler pipeline functional areas und API layers, besonders Syntax und Workspaces.
  - **به‌کار ببر:** Ordne die Tagesaufgabe der richtigen Roslyn-Schicht zu, bevor du APIs auswählst.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Ermittle die Hierarchie Solution/Project/Document <!-- w8-d1-t1-i1 -->
- [ ] Definiere das Verhalten bei Build-Fehlern <!-- w8-d1-t1-i2 -->
- [ ] Lege RepositoryId und ProjectId fest <!-- w8-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.1, § 10.2, § 38.2 <!-- w8-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.CSharp aus <!-- w8-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w8-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: SolutionLoader.cs + tests <!-- w8-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w8-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w8-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-11-18 — Syntax Tree und Traversal

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w8-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.CSharp |
| خروجی روز | `SyntaxWalker.cs + fixture` |
| منبع‌ها | [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252)؛ [Microsoft Learn: Roslyn Syntax Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/syntax-analysis)؛ [Yamaguchi et al. 2014: Code Property Graphs](https://drive.google.com/file/d/1SGWMjZA8Im9fXsuZxr6KnKdgijDH4o8r/view) |
| بخش‌های Exposé | 3.1.3 bis 3.1.4, 4.1 |

**دلیل:** Strukturierte Traversierung ersetzt fragile reguläre Ausdrücke.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 15 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Retrieval versus generation metrics.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Retrieval versus generation metrics“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-15-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [.NET Compiler Platform SDK concepts and object model](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/compiler-api-model) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Compiler pipeline functional areas und API layers, besonders Syntax und Workspaces.
  - **به‌کار ببر:** Ordne die Tagesaufgabe der richtigen Roslyn-Schicht zu, bevor du APIs auswählst.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Trenne Node, Token und Trivia <!-- w8-d2-t1-i1 -->
- [ ] Wähle die passende Traversierung für Deklarationen <!-- w8-d2-t1-i2 -->
- [ ] Dokumentiere SourceSpan und LineSpan <!-- w8-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.1.3 bis 3.1.4, § 4.1 <!-- w8-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.CSharp aus <!-- w8-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w8-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: SyntaxWalker.cs + fixture <!-- w8-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w8-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w8-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-11-19 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w10-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-10-integration-evidence.md` |
| منبع‌ها | [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource)؛ [Microsoft Learn: Roslyn Workspace](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/work-with-workspace) |
| بخش‌های Exposé | 1.6, 25, 26, 12 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 15: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-15-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w10-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w10-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w10-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 1.6, § 25, § 26, § 12 <!-- capacity-w10-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w10-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w10-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-10-integration-evidence.md <!-- capacity-w10-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w10-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w10-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 11 — Von der Solution zur Declaration

- **فاز:** Phase 1: Roslyn Syntax
- **هدف هفته:** Dateien, Klassen und Methoden werden mit eindeutiger Source Location extrahiert.
- **خروجی الزامی هفته:** `week-11-integration-evidence.md` (روز `capacity-w11-integration`)
- **بازه:** 2026-11-20 تا 2026-11-26

### روز 1 — 2026-11-20 — File und Namespace

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w8-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.CSharp |
| خروجی روز | `FileNamespaceExtractor.cs` |
| منبع‌ها | Olea et al. 2024: Persona Prompting for Question Answering؛ [Microsoft Learn: Roslyn Syntax Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/syntax-analysis)؛ [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740) |
| بخش‌های Exposé | 3.1.4, 38.4 |

**دلیل:** Eine Symbol-ID ist ohne Datei- und Namespace-Kontext unvollständig.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 16 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: Persona prompt design.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-16-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [.NET Compiler Platform SDK concepts and object model](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/compiler-api-model) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Compiler pipeline functional areas und API layers, besonders Syntax und Workspaces.
  - **به‌کار ببر:** Ordne die Tagesaufgabe der richtigen Roslyn-Schicht zu, bevor du APIs auswählst.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkenne file-scoped Namespaces <!-- w8-d3-t1-i1 -->
- [ ] Decke verschachtelte Namespaces ab <!-- w8-d3-t1-i2 -->
- [ ] Trenne Generated Files mit einer dokumentierten Regel <!-- w8-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.1.4, § 38.4 <!-- w8-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.CSharp aus <!-- w8-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w8-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: FileNamespaceExtractor.cs <!-- w8-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w8-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w8-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-11-23 — Class und Interface

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w8-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.CSharp |
| خروجی روز | `TypeDeclarationExtractor.cs` |
| منبع‌ها | Olea et al. 2024: Persona Prompting for Question Answering؛ [Microsoft Learn: Roslyn Syntax Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/syntax-analysis)؛ [Yamaguchi et al. 2014: Code Property Graphs](https://drive.google.com/file/d/1SGWMjZA8Im9fXsuZxr6KnKdgijDH4o8r/view) |
| بخش‌های Exposé | 3.1.4, 3.3.6, 38.4 |

**دلیل:** Types verbinden Methoden, Vererbung und Mapping.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 16 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: QA evaluation.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „QA evaluation“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-16-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [.NET Compiler Platform SDK concepts and object model](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/compiler-api-model) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Compiler pipeline functional areas und API layers, besonders Syntax und Workspaces.
  - **به‌کار ببر:** Ordne die Tagesaufgabe der richtigen Roslyn-Schicht zu, bevor du APIs auswählst.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkenne class, record und interface <!-- w8-d4-t1-i1 -->
- [ ] Dokumentiere verschachtelte Types <!-- w8-d4-t1-i2 -->
- [ ] Bewahre partial Types ohne falsche Zusammenführung <!-- w8-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.1.4, § 3.3.6, § 38.4 <!-- w8-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.CSharp aus <!-- w8-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w8-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: TypeDeclarationExtractor.cs <!-- w8-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w8-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w8-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-11-24 — Method und Constructor

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w8-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.CSharp |
| خروجی روز | `MethodExtractor.cs` |
| منبع‌ها | Olea et al. 2024: Persona Prompting for Question Answering؛ [Microsoft Learn: Roslyn Syntax Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/syntax-analysis)؛ [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740) |
| بخش‌های Exposé | 7.1, 12.2, 38.4 |

**دلیل:** Method ist die zentrale Einheit von RQ1 und vieler Evidenzpfade.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 16 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Role effects and threats.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Role effects and threats“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-16-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [.NET Compiler Platform SDK concepts and object model](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/compiler-api-model) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Compiler pipeline functional areas und API layers, besonders Syntax und Workspaces.
  - **به‌کار ببر:** Ordne die Tagesaufgabe der richtigen Roslyn-Schicht zu, bevor du APIs auswählst.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erzeuge die vollständige Signatur <!-- w8-d5-t1-i1 -->
- [ ] Trenne Konstruktor und lokale Funktion <!-- w8-d5-t1-i2 -->
- [ ] Fixiere startLine und endLine <!-- w8-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.1, § 12.2, § 38.4 <!-- w8-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.CSharp aus <!-- w8-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w8-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: MethodExtractor.cs <!-- w8-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w8-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w8-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-11-25 — Golden Tests für Deklarationen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w8-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Tests / CSharp |
| خروجی روز | `declarations.golden.json` |
| منبع‌ها | Olea et al. 2024: Persona Prompting for Question Answering؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Microsoft Learn: Roslyn Syntax Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/syntax-analysis) |
| بخش‌های Exposé | 38.10, 17 |

**دلیل:** Vor dem Semantic Model muss die Syntax-Schicht verlässlich sein.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 16 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Role effects and threats.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Role effects and threats“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-16-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [.NET Compiler Platform SDK concepts and object model](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/compiler-api-model) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Compiler pipeline functional areas und API layers, besonders Syntax und Workspaces.
  - **به‌کار ببر:** Ordne die Tagesaufgabe der richtigen Roslyn-Schicht zu, bevor du APIs auswählst.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erstelle minimale Fixtures für jede Deklaration <!-- w8-d6-t1-i1 -->
- [ ] Mache die Ausgabereihenfolge deterministisch <!-- w8-d6-t1-i2 -->
- [ ] Füge einen negativen Fall für Generated Code hinzu <!-- w8-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 38.10, § 17 <!-- w8-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Tests / CSharp aus <!-- w8-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w8-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: declarations.golden.json <!-- w8-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w8-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w8-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-11-26 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w11-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-11-integration-evidence.md` |
| منبع‌ها | Olea et al. 2024: Persona Prompting for Question Answering؛ [Microsoft Learn: Roslyn Syntax Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/syntax-analysis)؛ [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740)؛ [Yamaguchi et al. 2014: Code Property Graphs](https://drive.google.com/file/d/1SGWMjZA8Im9fXsuZxr6KnKdgijDH4o8r/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 3.1.4, 38.4, 3.3.6, 7.1 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 16: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-16-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [.NET Compiler Platform SDK concepts and object model](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/compiler-api-model) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Compiler pipeline functional areas und API layers, besonders Syntax und Workspaces.
  - **به‌کار ببر:** Ordne die Tagesaufgabe der richtigen Roslyn-Schicht zu, bevor du APIs auswählst.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w11-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w11-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w11-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.1.4, § 38.4, § 3.3.6, § 7.1 <!-- capacity-w11-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w11-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w11-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-11-integration-evidence.md <!-- capacity-w11-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w11-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w11-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 12 — Symbols, Calls und Provenance

- **فاز:** Phase 1: Roslyn Semantic
- **هدف هفته:** Declaration und Invocation werden über das Semantic Model verbunden; Unresolved bleibt explizit.
- **خروجی الزامی هفته:** `week-12-integration-evidence.md` (روز `capacity-w12-integration`)
- **بازه:** 2026-11-27 تا 2026-12-03

### روز 1 — 2026-11-27 — SemanticModel und Symbol

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w9-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.CSharp |
| خروجی روز | `SymbolResolver.cs` |
| منبع‌ها | Abedu et al. 2025: LLM + Knowledge Graph Repository QA؛ [Microsoft Learn: Roslyn Semantic Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/semantic-analysis)؛ [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view) |
| بخش‌های Exposé | 3.1.5 bis 3.1.7, 38.4 |

**دلیل:** Ähnliche Namen dürfen keine falsche semantische Beziehung erzeugen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 17 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: Repository QA pipeline.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-17-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Work with the Roslyn semantic model](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/work-with-semantics) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Compilation, Symbols und Semantic model.
  - **به‌کار ببر:** Nutze Symbolidentität statt Textnamen, wenn Aufrufe, Typen oder projektübergreifende Referenzen gemeint sind.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Trenne DeclaredSymbol und SymbolInfo <!-- w9-d1-t1-i1 -->
- [ ] Erzeuge eine vollständig qualifizierte Identität <!-- w9-d1-t1-i2 -->
- [ ] Halte Ambiguous und Unresolved explizit <!-- w9-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.1.5 bis 3.1.7, § 38.4 <!-- w9-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.CSharp aus <!-- w9-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w9-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: SymbolResolver.cs <!-- w9-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w9-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w9-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-11-30 — Invocation Extraction

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w9-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.CSharp |
| خروجی روز | `InvocationExtractor.cs` |
| منبع‌ها | Abedu et al. 2025: LLM + Knowledge Graph Repository QA؛ [Microsoft Learn: Roslyn Semantic Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/semantic-analysis)؛ [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740) |
| بخش‌های Exposé | 3.3.7, 10.2, 38.4 |

**دلیل:** INVOKES muss den Call Site mit dem Ziel-Symbol und seiner Location verbinden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 17 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Knowledge-graph grounding.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Knowledge-graph grounding“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-17-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Work with the Roslyn semantic model](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/work-with-semantics) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Compilation, Symbols und Semantic model.
  - **به‌کار ببر:** Nutze Symbolidentität statt Textnamen, wenn Aufrufe, Typen oder projektübergreifende Referenzen gemeint sind.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Finde InvocationExpression <!-- w9-d2-t1-i1 -->
- [ ] Löse die Zielmethode auf <!-- w9-d2-t1-i2 -->
- [ ] Bewahre die Call-Site-Location <!-- w9-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.3.7, § 10.2, § 38.4 <!-- w9-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.CSharp aus <!-- w9-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w9-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: InvocationExtractor.cs <!-- w9-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w9-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w9-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-12-01 — Constructor und Extension Calls

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w9-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.CSharp |
| خروجی روز | `SpecialCallExtractor.cs` |
| منبع‌ها | Abedu et al. 2025: LLM + Knowledge Graph Repository QA؛ [Microsoft Learn: Roslyn Semantic Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/semantic-analysis)؛ [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view) |
| بخش‌های Exposé | 2.1, 3.1.7, 27.4 |

**دلیل:** Call-Regeln müssen gängige C#-Fälle ohne Vermutungen abdecken.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 17 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Prompting and evaluation.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Prompting and evaluation“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-17-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Work with the Roslyn semantic model](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/work-with-semantics) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Compilation, Symbols und Semantic model.
  - **به‌کار ببر:** Nutze Symbolidentität statt Textnamen, wenn Aufrufe, Typen oder projektübergreifende Referenzen gemeint sind.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Verbinde Object Creation mit dem Konstruktor <!-- w9-d3-t1-i1 -->
- [ ] Löse das Ziel von Extension Methods auf <!-- w9-d3-t1-i2 -->
- [ ] Halte Dynamic Dispatch als Unresolved <!-- w9-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 2.1, § 3.1.7, § 27.4 <!-- w9-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.CSharp aus <!-- w9-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w9-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: SpecialCallExtractor.cs <!-- w9-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w9-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w9-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-12-02 — Globale Symbolidentität

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w9-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Core / Identity |
| خروجی روز | `SymbolId.cs + collision tests` |
| منبع‌ها | Abedu et al. 2025: LLM + Knowledge Graph Repository QA؛ [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 3.3.10, 38.4 |

**دلیل:** Cross-Project-Links sind ohne stabile Identität nicht reproduzierbar.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 17 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Prompting and evaluation.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Prompting and evaluation“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-17-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Work with the Roslyn semantic model](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/work-with-semantics) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Compilation, Symbols und Semantic model.
  - **به‌کار ببر:** Nutze Symbolidentität statt Textnamen, wenn Aufrufe, Typen oder projektübergreifende Referenzen gemeint sind.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Kombiniere Assembly, Namespace, Type und Signature <!-- w9-d4-t1-i1 -->
- [ ] Ergänze RepositoryId und ProjectId <!-- w9-d4-t1-i2 -->
- [ ] Erstelle einen Collision-Test für Overloads <!-- w9-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.3.10, § 38.4 <!-- w9-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Core / Identity aus <!-- w9-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w9-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: SymbolId.cs + collision tests <!-- w9-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w9-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w9-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-12-03 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w12-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-12-integration-evidence.md` |
| منبع‌ها | Abedu et al. 2025: LLM + Knowledge Graph Repository QA؛ [Microsoft Learn: Roslyn Semantic Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/semantic-analysis)؛ [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view)؛ [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740)؛ [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view) |
| بخش‌های Exposé | 3.1.5 bis 3.1.7, 38.4, 3.3.7, 10.2 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 17: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-17-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [Work with the Roslyn semantic model](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/work-with-semantics) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Compilation, Symbols und Semantic model.
  - **به‌کار ببر:** Nutze Symbolidentität statt Textnamen, wenn Aufrufe, Typen oder projektübergreifende Referenzen gemeint sind.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w12-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w12-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w12-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.1.5 bis 3.1.7, § 38.4, § 3.3.7, § 10.2 <!-- capacity-w12-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w12-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w12-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-12-integration-evidence.md <!-- capacity-w12-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w12-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w12-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 13 — Symbols, Calls und Provenance → Mapping und READ-Evidenz

- **فاز:** Phase 1: Roslyn Semantic / Phase 2: EF Core READ
- **هدف هفته:** Declaration und Invocation werden über das Semantic Model verbunden; Unresolved bleibt explizit. DbContext und DbSet werden bis zur Tabelle und READ-Operation mit Provenance extrahiert.
- **خروجی الزامی هفته:** `week-13-integration-evidence.md` (روز `capacity-w13-integration`)
- **بازه:** 2026-12-04 تا 2026-12-10

### روز 1 — 2026-12-04 — SourceLocation

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w9-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Core / Provenance |
| خروجی روز | `SourceLocation.cs` |
| منبع‌ها | Zhang et al. 2023: RepoCoder؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 3.4.5 bis 3.4.7, 10.5, 38.3 |

**دلیل:** Jeder Claim muss auf Datei und Zeile zurückführbar sein.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 18 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: Iterative retrieval.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-18-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Work with the Roslyn semantic model](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/work-with-semantics) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Compilation, Symbols und Semantic model.
  - **به‌کار ببر:** Nutze Symbolidentität statt Textnamen, wenn Aufrufe, Typen oder projektübergreifende Referenzen gemeint sind.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere lineStart und lineEnd <!-- w9-d5-t1-i1 -->
- [ ] Trenne Call-Site- und Declaration-Location <!-- w9-d5-t1-i2 -->
- [ ] Normalisiere den Dateipfad relativ zum Repository <!-- w9-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.4.5 bis 3.4.7, § 10.5, § 38.3 <!-- w9-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Core / Provenance aus <!-- w9-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w9-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: SourceLocation.cs <!-- w9-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w9-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w9-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-12-07 — Call-Graph-Integration

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w9-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.CSharp / Integration |
| خروجی روز | `call-graph-v1.jsonl` |
| منبع‌ها | Zhang et al. 2023: RepoCoder؛ [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Xie et al. 2026: CodeFuse Query](https://drive.google.com/file/d/1cfU7FbjkIRSamwvWKbL3pTH_EC0V-ObB/view) |
| بخش‌های Exposé | 10.2, 10.3, 38.10 |

**دلیل:** Der erste strukturelle Graph wird mit Fixture und deterministischer Ausgabe abgeschlossen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 18 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Repository context.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Repository context“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-18-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Work with the Roslyn semantic model](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/work-with-semantics) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Compilation, Symbols und Semantic model.
  - **به‌کار ببر:** Nutze Symbolidentität statt Textnamen, wenn Aufrufe, Typen oder projektübergreifende Referenzen gemeint sind.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Verbinde File-, Type- und Method-Nodes <!-- w9-d6-t1-i1 -->
- [ ] Zähle ungelöste INVOKES <!-- w9-d6-t1-i2 -->
- [ ] Bestätige manuell einen realen Danphe-Pfad <!-- w9-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 10.2, § 10.3, § 38.10 <!-- w9-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.CSharp / Integration aus <!-- w9-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w9-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: call-graph-v1.jsonl <!-- w9-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w9-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w9-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-12-08 — DbContext Discovery

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w10-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.EFCore |
| خروجی روز | `DbContextExtractor.cs` |
| منبع‌ها | Zhang et al. 2023: RepoCoder؛ [Microsoft Learn: EF Core Entity Mapping](https://learn.microsoft.com/en-us/ef/core/modeling/entity-types#table-name)؛ [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view) |
| بخش‌های Exposé | 3.2.2 bis 3.2.3, 38.5 |

**دلیل:** DbContext ist der Einstiegspunkt des EF-Core-Modells.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 18 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Retrieval-generation feedback.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Retrieval-generation feedback“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-18-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Overview of Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** The model, Querying und Saving data.
  - **به‌کار ببر:** Unterscheide DbContext, DbSet, Entity, Query und persistierende Operation, bevor du Evidenzregeln formulierst.
- [Querying Data with EF Core](https://learn.microsoft.com/en-us/ef/core/querying/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Loading, filtering und den Hinweis zur Übersetzung von LINQ in providerspezifische Queries.
  - **به‌کار ببر:** Markiere Query-Kandidat, Materialisierung und tatsächlichen READ-Beleg getrennt.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Löse die Vererbung von DbContext auf <!-- w10-d1-t1-i1 -->
- [ ] Dokumentiere die Context-Identität <!-- w10-d1-t1-i2 -->
- [ ] Markiere unvollständige oder externe Contexts <!-- w10-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.2.2 bis 3.2.3, § 38.5 <!-- w10-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.EFCore aus <!-- w10-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w10-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: DbContextExtractor.cs <!-- w10-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w10-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w10-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-12-09 — DbSet und Entity

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w10-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.EFCore |
| خروجی روز | `DbSetExtractor.cs` |
| منبع‌ها | Zhang et al. 2023: RepoCoder؛ [Microsoft Learn: EF Core Entity Mapping](https://learn.microsoft.com/en-us/ef/core/modeling/entity-types#table-name)؛ [Alshemaimri et al. 2021: Database Code Fragments Survey](https://onlinelibrary.wiley.com/doi/full/10.1002/eng2.12441) |
| بخش‌های Exposé | 3.2.4, 28.1, 38.5 |

**دلیل:** Ein DbSet ist ein Mapping-Kandidat, keine ausgeführte READ-Operation.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 18 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Retrieval-generation feedback.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Retrieval-generation feedback“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-18-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Overview of Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** The model, Querying und Saving data.
  - **به‌کار ببر:** Unterscheide DbContext, DbSet, Entity, Query und persistierende Operation, bevor du Evidenzregeln formulierst.
- [Querying Data with EF Core](https://learn.microsoft.com/en-us/ef/core/querying/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Loading, filtering und den Hinweis zur Übersetzung von LINQ in providerspezifische Queries.
  - **به‌کار ببر:** Markiere Query-Kandidat, Materialisierung und tatsächlichen READ-Beleg getrennt.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Extrahiere DbSet-Property und generischen Typ <!-- w10-d2-t1-i1 -->
- [ ] Löse die Entity-Identität auf <!-- w10-d2-t1-i2 -->
- [ ] Trenne Candidate-Status von READ <!-- w10-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.2.4, § 28.1, § 38.5 <!-- w10-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.EFCore aus <!-- w10-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w10-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: DbSetExtractor.cs <!-- w10-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w10-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w10-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-12-10 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w13-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-13-integration-evidence.md` |
| منبع‌ها | Zhang et al. 2023: RepoCoder؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Xie et al. 2026: CodeFuse Query](https://drive.google.com/file/d/1cfU7FbjkIRSamwvWKbL3pTH_EC0V-ObB/view) |
| بخش‌های Exposé | 3.4.5 bis 3.4.7, 10.5, 38.3, 10.2 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 18: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-18-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [Work with the Roslyn semantic model](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/work-with-semantics) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Compilation, Symbols und Semantic model.
  - **به‌کار ببر:** Nutze Symbolidentität statt Textnamen, wenn Aufrufe, Typen oder projektübergreifende Referenzen gemeint sind.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w13-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w13-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w13-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.4.5 bis 3.4.7, § 10.5, § 38.3, § 10.2 <!-- capacity-w13-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w13-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w13-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-13-integration-evidence.md <!-- capacity-w13-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w13-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w13-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 14 — Mapping und READ-Evidenz

- **فاز:** Phase 2: EF Core READ
- **هدف هفته:** DbContext und DbSet werden bis zur Tabelle und READ-Operation mit Provenance extrahiert.
- **خروجی الزامی هفته:** `week-14-integration-evidence.md` (روز `capacity-w14-integration`)
- **بازه:** 2026-12-11 تا 2026-12-17

### روز 1 — 2026-12-11 — Table Mapping

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w10-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.EFCore |
| خروجی روز | `TableMappingResolver.cs` |
| منبع‌ها | Shah et al. 2025: RANGER؛ [Microsoft Learn: EF Core Entity Mapping](https://learn.microsoft.com/en-us/ef/core/modeling/entity-types#table-name)؛ [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view) |
| بخش‌های Exposé | 3.2.12 bis 3.2.13, 38.3 |

**دلیل:** Ein Tabellen-Claim ist nur mit gültigem Mapping erlaubt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 19 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: Graph-enhanced retrieval.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-19-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Overview of Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** The model, Querying und Saving data.
  - **به‌کار ببر:** Unterscheide DbContext, DbSet, Entity, Query und persistierende Operation, bevor du Evidenzregeln formulierst.
- [Querying Data with EF Core](https://learn.microsoft.com/en-us/ef/core/querying/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Loading, filtering und den Hinweis zur Übersetzung von LINQ in providerspezifische Queries.
  - **به‌کار ببر:** Markiere Query-Kandidat, Materialisierung und tatsächlichen READ-Beleg getrennt.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Finde das ToTable-Mapping <!-- w10-d3-t1-i1 -->
- [ ] Dokumentiere konventionsbasierte Tabellennamen <!-- w10-d3-t1-i2 -->
- [ ] Setze unbekanntes Mapping auf UNRESOLVED <!-- w10-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.2.12 bis 3.2.13, § 38.3 <!-- w10-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.EFCore aus <!-- w10-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w10-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: TableMappingResolver.cs <!-- w10-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w10-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w10-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-12-14 — LINQ Query Candidate

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w10-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.EFCore |
| خروجی روز | `LinqQueryExtractor.cs` |
| منبع‌ها | Shah et al. 2025: RANGER؛ [Microsoft Learn: EF Core Querying](https://learn.microsoft.com/en-us/ef/core/querying/)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view) |
| بخش‌های Exposé | 3.2.5 bis 3.2.6, 28.1 |

**دلیل:** Das Vorhandensein eines Query-Ausdrucks bedeutet noch keine Ausführung.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 19 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Flat/Graph comparison.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Flat/Graph comparison“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-19-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Overview of Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** The model, Querying und Saving data.
  - **به‌کار ببر:** Unterscheide DbContext, DbSet, Entity, Query und persistierende Operation, bevor du Evidenzregeln formulierst.
- [Querying Data with EF Core](https://learn.microsoft.com/en-us/ef/core/querying/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Loading, filtering und den Hinweis zur Übersetzung von LINQ in providerspezifische Queries.
  - **به‌کار ببر:** Markiere Query-Kandidat, Materialisierung und tatsächlichen READ-Beleg getrennt.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Verbinde den Query Root mit DbSet <!-- w10-d4-t1-i1 -->
- [ ] Dokumentiere Where, Select und Include <!-- w10-d4-t1-i2 -->
- [ ] Bestimme die Grenze der verzögerten Ausführung <!-- w10-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.2.5 bis 3.2.6, § 28.1 <!-- w10-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.EFCore aus <!-- w10-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w10-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: LinqQueryExtractor.cs <!-- w10-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w10-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w10-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-12-15 — Materialization und READ

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w10-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.EFCore |
| خروجی روز | `ReadMaterializerRules.cs` |
| منبع‌ها | Shah et al. 2025: RANGER؛ [Microsoft Learn: EF Core Querying](https://learn.microsoft.com/en-us/ef/core/querying/)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view) |
| بخش‌های Exposé | 28.1, 38.5 |

**دلیل:** READ muss mit Materializer und Zieltabelle verbunden sein.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 19 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Data, metrics, and threats.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Data, metrics, and threats“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-19-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Overview of Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** The model, Querying und Saving data.
  - **به‌کار ببر:** Unterscheide DbContext, DbSet, Entity, Query und persistierende Operation, bevor du Evidenzregeln formulierst.
- [Querying Data with EF Core](https://learn.microsoft.com/en-us/ef/core/querying/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Loading, filtering und den Hinweis zur Übersetzung von LINQ in providerspezifische Queries.
  - **به‌کار ببر:** Markiere Query-Kandidat, Materialisierung und tatsächlichen READ-Beleg getrennt.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Decke ToList, First, Single, Any und Count ab <!-- w10-d5-t1-i1 -->
- [ ] Dokumentiere asynchrone Varianten <!-- w10-d5-t1-i2 -->
- [ ] Bewahre die SourceLocation der Materialisierung <!-- w10-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 28.1, § 38.5 <!-- w10-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.EFCore aus <!-- w10-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w10-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: ReadMaterializerRules.cs <!-- w10-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w10-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w10-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-12-16 — READ Integration Tests

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w10-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Tests / EFCore |
| خروجی روز | `ef-read.golden.json` |
| منبع‌ها | Shah et al. 2025: RANGER؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource) |
| بخش‌های Exposé | 7.1, 14.1, 38.10 |

**دلیل:** READ-Regeln werden mit positiven und negativen Fixtures sowie einem Danphe-Beispiel abgeschlossen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 19 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Data, metrics, and threats.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Data, metrics, and threats“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-19-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Overview of Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** The model, Querying und Saving data.
  - **به‌کار ببر:** Unterscheide DbContext, DbSet, Entity, Query und persistierende Operation, bevor du Evidenzregeln formulierst.
- [Querying Data with EF Core](https://learn.microsoft.com/en-us/ef/core/querying/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Loading, filtering und den Hinweis zur Übersetzung von LINQ in providerspezifische Queries.
  - **به‌کار ببر:** Markiere Query-Kandidat, Materialisierung und tatsächlichen READ-Beleg getrennt.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Bestätige einen realen READ-End-to-End-Fall <!-- w10-d6-t1-i1 -->
- [ ] Markiere DbSet ohne Materialisierung als negativ <!-- w10-d6-t1-i2 -->
- [ ] Erzeuge bei unbekanntem Mapping keinen Tabellen-Claim <!-- w10-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.1, § 14.1, § 38.10 <!-- w10-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Tests / EFCore aus <!-- w10-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w10-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: ef-read.golden.json <!-- w10-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w10-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w10-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-12-17 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w14-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-14-integration-evidence.md` |
| منبع‌ها | Shah et al. 2025: RANGER؛ [Microsoft Learn: EF Core Entity Mapping](https://learn.microsoft.com/en-us/ef/core/modeling/entity-types#table-name)؛ [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view)؛ [Microsoft Learn: EF Core Querying](https://learn.microsoft.com/en-us/ef/core/querying/)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view) |
| بخش‌های Exposé | 3.2.12 bis 3.2.13, 38.3, 3.2.5 bis 3.2.6, 28.1 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 19: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-19-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [Overview of Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** The model, Querying und Saving data.
  - **به‌کار ببر:** Unterscheide DbContext, DbSet, Entity, Query und persistierende Operation, bevor du Evidenzregeln formulierst.
- [Querying Data with EF Core](https://learn.microsoft.com/en-us/ef/core/querying/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Loading, filtering und den Hinweis zur Übersetzung von LINQ in providerspezifische Queries.
  - **به‌کار ببر:** Markiere Query-Kandidat, Materialisierung und tatsächlichen READ-Beleg getrennt.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w14-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w14-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w14-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.2.12 bis 3.2.13, § 38.3, § 3.2.5 bis 3.2.6, § 28.1 <!-- capacity-w14-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w14-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w14-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-14-integration-evidence.md <!-- capacity-w14-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w14-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w14-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 15 — Mutation, Persistence und Vertical Slice

- **فاز:** Phase 2: EF Core WRITE
- **هدف هفته:** Mutation wird über SaveChanges bis zur Tabelle mit einem erklärbaren Evidenzpfad verbunden.
- **خروجی الزامی هفته:** `week-15-integration-evidence.md` (روز `capacity-w15-integration`)
- **بازه:** 2026-12-18 تا 2026-12-24

### روز 1 — 2026-12-18 — Add, Update und Remove

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w11-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.EFCore |
| خروجی روز | `MutationExtractor.cs` |
| منبع‌ها | Tao et al. 2026: Retrieval-Augmented Code Generation Survey؛ [Microsoft Learn: EF Core Saving](https://learn.microsoft.com/en-us/ef/core/saving/)؛ [Alshemaimri et al. 2021: Database Code Fragments Survey](https://onlinelibrary.wiley.com/doi/full/10.1002/eng2.12441) |
| بخش‌های Exposé | 3.2.7 bis 3.2.8, 28.2 |

**دلیل:** Ein Mutation-Kandidat muss von Persistence getrennt bleiben.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 20 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: RAG-for-code taxonomy.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-20-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Saving Data with EF Core](https://learn.microsoft.com/en-us/ef/core/saving/) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Change tracking and SaveChanges sowie ExecuteUpdate and ExecuteDelete.
  - **به‌کار ببر:** Trenne Mutation im Speicher von der Operation, die wirklich in die Datenbank persistiert.
- [Overview of Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** The model, Querying und Saving data.
  - **به‌کار ببر:** Unterscheide DbContext, DbSet, Entity, Query und persistierende Operation, bevor du Evidenzregeln formulierst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Decke die APIs Add, Update und Remove ab <!-- w11-d1-t1-i1 -->
- [ ] Löse Entity und DbSet-Ziel auf <!-- w11-d1-t1-i2 -->
- [ ] Dokumentiere die MUTATES-Kante mit Location <!-- w11-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.2.7 bis 3.2.8, § 28.2 <!-- w11-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.EFCore aus <!-- w11-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w11-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: MutationExtractor.cs <!-- w11-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w11-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w11-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-12-21 — SaveChanges und PERSISTS

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w11-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.EFCore |
| خروجی روز | `PersistenceExtractor.cs` |
| منبع‌ها | Tao et al. 2026: Retrieval-Augmented Code Generation Survey؛ [Microsoft Learn: EF Core Saving](https://learn.microsoft.com/en-us/ef/core/saving/)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view) |
| بخش‌های Exposé | 28.2, 38.6 |

**دلیل:** Eine unterstützte WRITE-Operation benötigt einen erklärbaren Pfad bis SaveChanges.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 20 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Retrieval and generation stages.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Retrieval and generation stages“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-20-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Saving Data with EF Core](https://learn.microsoft.com/en-us/ef/core/saving/) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Change tracking and SaveChanges sowie ExecuteUpdate and ExecuteDelete.
  - **به‌کار ببر:** Trenne Mutation im Speicher von der Operation, die wirklich in die Datenbank persistiert.
- [Overview of Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** The model, Querying und Saving data.
  - **به‌کار ببر:** Unterscheide DbContext, DbSet, Entity, Query und persistierende Operation, bevor du Evidenzregeln formulierst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Extrahiere SaveChanges und SaveChangesAsync <!-- w11-d2-t1-i1 -->
- [ ] Verbinde Mutation und Persistence in einer Method <!-- w11-d2-t1-i2 -->
- [ ] Begrenze die interprozedurale Distanz explizit <!-- w11-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 28.2, § 38.6 <!-- w11-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.EFCore aus <!-- w11-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w11-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: PersistenceExtractor.cs <!-- w11-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w11-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w11-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-12-22 — ExecuteUpdate und ExecuteDelete

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w11-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.EFCore |
| خروجی روز | `BulkWriteRules.cs` |
| منبع‌ها | Tao et al. 2026: Retrieval-Augmented Code Generation Survey؛ [Microsoft Learn: EF Core Saving](https://learn.microsoft.com/en-us/ef/core/saving/)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 38.6, 27.1 |

**دلیل:** Bulk-APIs besitzen eigene Regeln und dürfen nicht wie Change Tracking behandelt werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 20 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Open limitations.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Open limitations“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-20-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Saving Data with EF Core](https://learn.microsoft.com/en-us/ef/core/saving/) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Change tracking and SaveChanges sowie ExecuteUpdate and ExecuteDelete.
  - **به‌کار ببر:** Trenne Mutation im Speicher von der Operation, die wirklich in die Datenbank persistiert.
- [Overview of Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** The model, Querying und Saving data.
  - **به‌کار ببر:** Unterscheide DbContext, DbSet, Entity, Query und persistierende Operation, bevor du Evidenzregeln formulierst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Finde Bulk-Methoden <!-- w11-d3-t1-i1 -->
- [ ] Löse die Zielabfrage auf <!-- w11-d3-t1-i2 -->
- [ ] Dokumentiere, dass SaveChanges nicht nötig ist <!-- w11-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 38.6, § 27.1 <!-- w11-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.EFCore aus <!-- w11-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w11-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: BulkWriteRules.cs <!-- w11-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w11-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w11-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-12-23 — WRITE Target Resolution

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w11-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Extractors.EFCore |
| خروجی روز | `WriteTargetResolver.cs` |
| منبع‌ها | Tao et al. 2026: Retrieval-Augmented Code Generation Survey؛ [Microsoft Learn: EF Core Entity Mapping](https://learn.microsoft.com/en-us/ef/core/modeling/entity-types#table-name)؛ [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view) |
| بخش‌های Exposé | 3.4.8, 38.6 |

**دلیل:** WRITES_TO wird nur bei ausreichendem Mapping erzeugt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 20 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Open limitations.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Open limitations“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-20-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Saving Data with EF Core](https://learn.microsoft.com/en-us/ef/core/saving/) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Change tracking and SaveChanges sowie ExecuteUpdate and ExecuteDelete.
  - **به‌کار ببر:** Trenne Mutation im Speicher von der Operation, die wirklich in die Datenbank persistiert.
- [Overview of Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** The model, Querying und Saving data.
  - **به‌کار ببر:** Unterscheide DbContext, DbSet, Entity, Query und persistierende Operation, bevor du Evidenzregeln formulierst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erzeuge den Entity-to-table-Pfad <!-- w11-d4-t1-i1 -->
- [ ] Stoppe bei ungelöstem Mapping <!-- w11-d4-t1-i2 -->
- [ ] Behaupte Trigger oder Interceptor nicht ohne Evidenz <!-- w11-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.4.8, § 38.6 <!-- w11-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors.EFCore aus <!-- w11-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w11-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: WriteTargetResolver.cs <!-- w11-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w11-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w11-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-12-24 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w15-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-15-integration-evidence.md` |
| منبع‌ها | Tao et al. 2026: Retrieval-Augmented Code Generation Survey؛ [Microsoft Learn: EF Core Saving](https://learn.microsoft.com/en-us/ef/core/saving/)؛ [Alshemaimri et al. 2021: Database Code Fragments Survey](https://onlinelibrary.wiley.com/doi/full/10.1002/eng2.12441)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 3.2.7 bis 3.2.8, 28.2, 38.6, 27.1 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 20: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-20-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [Saving Data with EF Core](https://learn.microsoft.com/en-us/ef/core/saving/) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Change tracking and SaveChanges sowie ExecuteUpdate and ExecuteDelete.
  - **به‌کار ببر:** Trenne Mutation im Speicher von der Operation, die wirklich in die Datenbank persistiert.
- [Overview of Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** The model, Querying und Saving data.
  - **به‌کار ببر:** Unterscheide DbContext, DbSet, Entity, Query und persistierende Operation, bevor du Evidenzregeln formulierst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w15-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w15-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w15-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.2.7 bis 3.2.8, § 28.2, § 38.6, § 27.1 <!-- capacity-w15-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w15-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w15-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-15-integration-evidence.md <!-- capacity-w15-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w15-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w15-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 16 — Mutation, Persistence und Vertical Slice → EvidenceRecord, Provenance und JSONL

- **فاز:** Phase 2: EF Core WRITE / Phase 3: Evidence Model
- **هدف هفته:** Mutation wird über SaveChanges bis zur Tabelle mit einem erklärbaren Evidenzpfad verbunden. Das wissenschaftliche Modell wird vom Storage getrennt; alle Claims bleiben nachvollziehbar.
- **خروجی الزامی هفته:** `week-16-integration-evidence.md` (روز `capacity-w16-integration`)
- **بازه:** 2026-12-25 تا 2026-12-31

### روز 1 — 2026-12-25 — Realer Vertical Slice

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w11-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | CLI / End-to-End |
| خروجی روز | `vertical-slice-001.json` |
| منبع‌ها | Tao et al. 2025: Code Graph Model؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 10.2 bis 10.5, 26.2 bis 26.4 |

**دلیل:** Ein realer Pfad von Method zu Table zeigt den Wert des Artefakts.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 21 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: Graph-aware attention.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-21-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Saving Data with EF Core](https://learn.microsoft.com/en-us/ef/core/saving/) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Change tracking and SaveChanges sowie ExecuteUpdate and ExecuteDelete.
  - **به‌کار ببر:** Trenne Mutation im Speicher von der Operation, die wirklich in die Datenbank persistiert.
- [Overview of Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** The model, Querying und Saving data.
  - **به‌کار ببر:** Unterscheide DbContext, DbSet, Entity, Query und persistierende Operation, bevor du Evidenzregeln formulierst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Bestimme Method und Call Chain <!-- w11-d5-t1-i1 -->
- [ ] Führe Mutation, Persistence und Mapping zusammen <!-- w11-d5-t1-i2 -->
- [ ] Prüfe alle SourceLocations manuell <!-- w11-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 10.2 bis 10.5, § 26.2 bis 26.4 <!-- w11-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in CLI / End-to-End aus <!-- w11-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w11-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: vertical-slice-001.json <!-- w11-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w11-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w11-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2026-12-28 — Capability Matrix

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w11-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Docs / Capabilities |
| خروجی روز | `capability-matrix.md` |
| منبع‌ها | Tao et al. 2025: Code Graph Model؛ [Alshemaimri et al. 2021: Database Code Fragments Survey](https://onlinelibrary.wiley.com/doi/full/10.1002/eng2.12441)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 8, 28.4, 31 |

**دلیل:** Transparente Grenzen verhindern überzogene Claims.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 21 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Adapter strategy.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Adapter strategy“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-21-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Saving Data with EF Core](https://learn.microsoft.com/en-us/ef/core/saving/) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Change tracking and SaveChanges sowie ExecuteUpdate and ExecuteDelete.
  - **به‌کار ببر:** Trenne Mutation im Speicher von der Operation, die wirklich in die Datenbank persistiert.
- [Overview of Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** The model, Querying und Saving data.
  - **به‌کار ببر:** Unterscheide DbContext, DbSet, Entity, Query und persistierende Operation, bevor du Evidenzregeln formulierst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Klassifiziere jedes EF-Muster als supported, partial oder unsupported <!-- w11-d6-t1-i1 -->
- [ ] Dokumentiere ADO.NET und SQL nur, wenn sie beobachtet wurden <!-- w11-d6-t1-i2 -->
- [ ] Formuliere eine Stop Decision für Erweiterungen <!-- w11-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 8, § 28.4, § 31 <!-- w11-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Docs / Capabilities aus <!-- w11-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w11-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: capability-matrix.md <!-- w11-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w11-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w11-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2026-12-29 — EvidenceRecord Contract

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w12-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Core |
| خروجی روز | `EvidenceRecord.cs` |
| منبع‌ها | Tao et al. 2025: Code Graph Model؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) |
| بخش‌های Exposé | 3.4, 10.5, 38.3 |

**دلیل:** Die zentrale Artefakteinheit muss Claim, Rule, Status und Location trennen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 21 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: PEFT/QLoRA boundary.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „PEFT/QLoRA boundary“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-21-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Extrahiere die Pflichtfelder des Records <!-- w12-d1-t1-i1 -->
- [ ] Trenne ObservationType und ClaimType <!-- w12-d1-t1-i2 -->
- [ ] Definiere RuleId und RuleVersion <!-- w12-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.4, § 10.5, § 38.3 <!-- w12-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Core aus <!-- w12-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w12-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: EvidenceRecord.cs <!-- w12-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w12-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w12-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2026-12-30 — Evidence Status

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w12-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Core |
| خروجی روز | `EvidenceStatus.cs + tests` |
| منبع‌ها | Tao et al. 2025: Code Graph Model؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) |
| بخش‌های Exposé | 3.4.9, 10.6, 27.4 |

**دلیل:** OBSERVED und DERIVED dürfen nicht mit UNRESOLVED oder CONFLICTING vermischt werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 21 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: PEFT/QLoRA boundary.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „PEFT/QLoRA boundary“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-21-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Formuliere die Bedingung jedes Status <!-- w12-d2-t1-i1 -->
- [ ] Definiere erlaubte Übergänge <!-- w12-d2-t1-i2 -->
- [ ] Erstelle für jeden Status ein Fixture <!-- w12-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.4.9, § 10.6, § 27.4 <!-- w12-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Core aus <!-- w12-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w12-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: EvidenceStatus.cs + tests <!-- w12-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w12-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w12-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2026-12-31 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w16-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-16-integration-evidence.md` |
| منبع‌ها | Tao et al. 2025: Code Graph Model؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Alshemaimri et al. 2021: Database Code Fragments Survey](https://onlinelibrary.wiley.com/doi/full/10.1002/eng2.12441)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) |
| بخش‌های Exposé | 10.2 bis 10.5, 26.2 bis 26.4, 8, 28.4 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 21: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-21-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [Saving Data with EF Core](https://learn.microsoft.com/en-us/ef/core/saving/) — Microsoft Learn، 18 دقیقه
  - **بخوان:** Change tracking and SaveChanges sowie ExecuteUpdate and ExecuteDelete.
  - **به‌کار ببر:** Trenne Mutation im Speicher von der Operation, die wirklich in die Datenbank persistiert.
- [Overview of Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — Microsoft Learn، 15 دقیقه
  - **بخوان:** The model, Querying und Saving data.
  - **به‌کار ببر:** Unterscheide DbContext, DbSet, Entity, Query und persistierende Operation, bevor du Evidenzregeln formulierst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w16-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w16-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w16-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 10.2 bis 10.5, § 26.2 bis 26.4, § 8, § 28.4 <!-- capacity-w16-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w16-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w16-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-16-integration-evidence.md <!-- capacity-w16-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w16-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w16-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 17 — EvidenceRecord, Provenance und JSONL

- **فاز:** Phase 3: Evidence Model
- **هدف هفته:** Das wissenschaftliche Modell wird vom Storage getrennt; alle Claims bleiben nachvollziehbar.
- **خروجی الزامی هفته:** `week-17-integration-evidence.md` (روز `capacity-w17-integration`)
- **بازه:** 2027-01-01 تا 2027-01-07

### روز 1 — 2027-01-01 — Globale IDs und Datenbankziel

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w12-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Core |
| خروجی روز | `DatabaseTargetId.cs` |
| منبع‌ها | Lekssays 2026: Bridging CPGs and Language Models؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view) |
| بخش‌های Exposé | 38.4, 28.3 |

**دلیل:** Das Tabellenziel muss mit ausreichender Identität und ohne erfundenes Schema gespeichert werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 22 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: CPG-constrained context.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-22-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Kombiniere Repository-, Project- und Symbol-ID <!-- w12-d3-t1-i1 -->
- [ ] Definiere die Identität von Database, Schema und Table <!-- w12-d3-t1-i2 -->
- [ ] Markiere partielle Identität explizit <!-- w12-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 38.4, § 28.3 <!-- w12-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Core aus <!-- w12-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w12-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: DatabaseTargetId.cs <!-- w12-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w12-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w12-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-01-04 — Evidence Path

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w12-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Core / Paths |
| خروجی روز | `EvidencePath.cs` |
| منبع‌ها | Lekssays 2026: Bridging CPGs and Language Models؛ [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 3.4.7 bis 3.4.8, 14.2, 38.9 |

**دلیل:** RQ2 benötigt einen validen Pfad, nicht nur eine Ergebnisliste.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 22 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Language-model integration.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Language-model integration“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-22-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere die Reihenfolge erforderlicher Kanten <!-- w12-d4-t1-i1 -->
- [ ] Bewahre die SourceLocation jedes Schritts <!-- w12-d4-t1-i2 -->
- [ ] Mache fehlende Schritte zu Evidence Gaps <!-- w12-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.4.7 bis 3.4.8, § 14.2, § 38.9 <!-- w12-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Core / Paths aus <!-- w12-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w12-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: EvidencePath.cs <!-- w12-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w12-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w12-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-01-05 — Deterministisches JSONL

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w12-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | CLI / Serialization |
| خروجی روز | `evidence-v1.jsonl + hash` |
| منبع‌ها | Lekssays 2026: Bridging CPGs and Language Models؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Xie et al. 2026: CodeFuse Query](https://drive.google.com/file/d/1cfU7FbjkIRSamwvWKbL3pTH_EC0V-ObB/view) |
| بخش‌های Exposé | 11.3, 38.11 |

**دلیل:** Dieselbe Eingabe muss dieselbe Evidenzausgabe erzeugen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 22 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Traceability and evaluation.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Traceability and evaluation“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-22-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.
- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Fixiere Feldreihenfolge und Encoding <!-- w12-d5-t1-i1 -->
- [ ] Definiere den Sortierschlüssel der Records <!-- w12-d5-t1-i2 -->
- [ ] Speichere den Output-Hash im Manifest <!-- w12-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 11.3, § 38.11 <!-- w12-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in CLI / Serialization aus <!-- w12-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w12-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: evidence-v1.jsonl + hash <!-- w12-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w12-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w12-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-01-06 — Evidence Integration Gate

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w12-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Core / Integration |
| خروجی روز | `evidence-contract-v1.md` |
| منبع‌ها | Lekssays 2026: Bridging CPGs and Language Models؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource) |
| بخش‌های Exposé | 17, 27.3, 38.10 |

**دلیل:** Vor dem Graphen muss die storageunabhängige Ausgabe valide sein.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 22 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Traceability and evaluation.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Traceability and evaluation“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-22-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Validiere READ- und WRITE-Records <!-- w12-d6-t1-i1 -->
- [ ] Erlaube keinen Tabellen-Claim ohne Mapping <!-- w12-d6-t1-i2 -->
- [ ] Reproduziere den Golden Snapshot <!-- w12-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 17, § 27.3, § 38.10 <!-- w12-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Core / Integration aus <!-- w12-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w12-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: evidence-contract-v1.md <!-- w12-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w12-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w12-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-01-07 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w17-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-17-integration-evidence.md` |
| منبع‌ها | Lekssays 2026: Bridging CPGs and Language Models؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view)؛ [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Xie et al. 2026: CodeFuse Query](https://drive.google.com/file/d/1cfU7FbjkIRSamwvWKbL3pTH_EC0V-ObB/view) |
| بخش‌های Exposé | 38.4, 28.3, 3.4.7 bis 3.4.8, 14.2 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 22: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-22-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w17-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w17-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w17-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 38.4, § 28.3, § 3.4.7 bis 3.4.8, § 14.2 <!-- capacity-w17-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w17-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w17-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-17-integration-evidence.md <!-- capacity-w17-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w17-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w17-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 18 — Graph Schema und Import

- **فاز:** Phase 4: Neo4j Graph
- **هدف هفته:** Das Evidence Model wird nach Neo4j übertragen, ohne seine wissenschaftliche Bedeutung an den Storage zu binden.
- **خروجی الزامی هفته:** `week-18-integration-evidence.md` (روز `capacity-w18-integration`)
- **بازه:** 2027-01-08 تا 2027-01-14

### روز 1 — 2027-01-08 — Property Graph Modeling

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w13-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Graph |
| خروجی روز | `graph-schema-v1.md` |
| منبع‌ها | Lekssays 2025: LLMxCPG؛ [Neo4j: Data Modeling](https://neo4j.com/docs/getting-started/data-modeling/)؛ [Yamaguchi et al. 2014: Code Property Graphs](https://drive.google.com/file/d/1SGWMjZA8Im9fXsuZxr6KnKdgijDH4o8r/view) |
| بخش‌های Exposé | 3.3, 10.3, 38.8 |

**دلیل:** Nodes und Relationships müssen Use Cases und Evidenzableitung folgen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 23 · Block 1/4 · Orientierung und Artikelentscheidung
- **حالت / بلوک:** article، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur Titel, Abstract, Überschriften, eine zentrale Figure/Table und die Conclusion überfliegen. Fokus: LLM and CPG integration.
- **امروز نخوان:** Noch keine Detailabschnitte und keine vollständige Übersetzung lesen.
- **پرسش راهنما:** Warum ist dieser Artikel für die Thesis A, B oder C und welcher Teil ist wirklich erforderlich?
- **مدرک تحقیق:** `article-23-block-1.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [What is a graph database?](https://neo4j.com/docs/getting-started/graph-database/) — Neo4j Documentation، 15 دقیقه
  - **بخوان:** Nodes, relationships, properties, data model, indexes und constraints.
  - **به‌کار ببر:** Entscheide, was Entität, Beziehung oder Property ist, und begründe es mit einer Projektfrage.
- [Get started with Cypher](https://neo4j.com/docs/getting-started/cypher/intro-tutorial/) — Neo4j Documentation، 20 دقیقه
  - **بخوان:** Create the Movie Graph und die ersten MATCH-, CREATE- und MERGE-Beispiele.
  - **به‌کار ببر:** Übertrage das Muster auf Evidence-Nodes und gerichtete Beziehungen; teste Idempotenz mit MERGE.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Leite die nötigen Nodes aus §38.8 ab <!-- w13-d1-t1-i1 -->
- [ ] Dokumentiere die Kardinalität der Beziehungen <!-- w13-d1-t1-i2 -->
- [ ] Behandle EvidenceRecord als First-Class-Objekt <!-- w13-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.3, § 10.3, § 38.8 <!-- w13-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Graph aus <!-- w13-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w13-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: graph-schema-v1.md <!-- w13-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w13-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w13-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-01-11 — Constraints und Indizes

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w13-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Graph |
| خروجی روز | `constraints.cypher` |
| منبع‌ها | Lekssays 2025: LLMxCPG؛ [Neo4j: Data Modeling](https://neo4j.com/docs/getting-started/data-modeling/)؛ [Xie et al. 2026: CodeFuse Query](https://drive.google.com/file/d/1cfU7FbjkIRSamwvWKbL3pTH_EC0V-ObB/view) |
| بخش‌های Exposé | 3.3.10, 38.8 |

**دلیل:** Globale IDs brauchen Eindeutigkeit; Queries müssen ausführbar bleiben.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 23 · Block 2/4 · Direkt relevantes Konzept
- **حالت / بلوک:** article، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur einen direkt relevanten Absatz, eine Definition oder einen kleinen Subsection zum ersten Artikelfokus lesen. Fokus: Multi-function context.
- **امروز نخوان:** Historischen Hintergrund und nicht projektbezogene Beispiele heute auslassen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Multi-function context“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-23-block-2.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [What is a graph database?](https://neo4j.com/docs/getting-started/graph-database/) — Neo4j Documentation، 15 دقیقه
  - **بخوان:** Nodes, relationships, properties, data model, indexes und constraints.
  - **به‌کار ببر:** Entscheide, was Entität, Beziehung oder Property ist, und begründe es mit einer Projektfrage.
- [Get started with Cypher](https://neo4j.com/docs/getting-started/cypher/intro-tutorial/) — Neo4j Documentation، 20 دقیقه
  - **بخوان:** Create the Movie Graph und die ersten MATCH-, CREATE- und MERGE-Beispiele.
  - **به‌کار ببر:** Übertrage das Muster auf Evidence-Nodes und gerichtete Beziehungen; teste Idempotenz mit MERGE.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere Unique Constraints <!-- w13-d2-t1-i1 -->
- [ ] Wähle querygetriebene Indizes <!-- w13-d2-t1-i2 -->
- [ ] Erstelle Tests für Kollisionen und fehlende IDs <!-- w13-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.3.10, § 38.8 <!-- w13-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Graph aus <!-- w13-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w13-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: constraints.cypher <!-- w13-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w13-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w13-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-01-12 — Cypher CREATE und MERGE

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w13-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Graph / Import |
| خروجی روز | `cypher-practice.md` |
| منبع‌ها | Lekssays 2025: LLMxCPG؛ [Neo4j GraphAcademy: Cypher Fundamentals](https://graphacademy.neo4j.com/courses/cypher-fundamentals) |
| بخش‌های Exposé | 3.3.8, 38.8 |

**دلیل:** Der Importer darf bei wiederholter Ausführung keine Duplikate erzeugen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 23 · Block 3/4 · Methode, Guideline oder Evaluation
- **حالت / بلوک:** article، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die Methode, Guideline, Architekturpassage oder Evaluation lesen, die eine Projektentscheidung stützen kann. Fokus: Method result and limits.
- **امروز نخوان:** Keine zusätzliche Methode implementieren und keine Nebenexperimente verfolgen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Method result and limits“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-23-block-3.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [What is a graph database?](https://neo4j.com/docs/getting-started/graph-database/) — Neo4j Documentation، 15 دقیقه
  - **بخوان:** Nodes, relationships, properties, data model, indexes und constraints.
  - **به‌کار ببر:** Entscheide, was Entität, Beziehung oder Property ist, und begründe es mit einer Projektfrage.
- [Get started with Cypher](https://neo4j.com/docs/getting-started/cypher/intro-tutorial/) — Neo4j Documentation، 20 دقیقه
  - **بخوان:** Create the Movie Graph und die ersten MATCH-, CREATE- und MERGE-Beispiele.
  - **به‌کار ببر:** Übertrage das Muster auf Evidence-Nodes und gerichtete Beziehungen; teste Idempotenz mit MERGE.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Unterschied zwischen CREATE und MERGE <!-- w13-d3-t1-i1 -->
- [ ] Übe MERGE auf der globalen ID <!-- w13-d3-t1-i2 -->
- [ ] Bewahre Relationship-Provenance ohne Überschreiben <!-- w13-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.3.8, § 38.8 <!-- w13-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Graph / Import aus <!-- w13-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w13-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: cypher-practice.md <!-- w13-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w13-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w13-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-01-13 — Node Import

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w13-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Graph / Import |
| خروجی روز | `NodeImporter.cs` |
| منبع‌ها | Lekssays 2025: LLMxCPG؛ [Neo4j: Data Modeling](https://neo4j.com/docs/getting-started/data-modeling/)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 10.2, 38.8 |

**دلیل:** Der schrittweise Import muss test- und berichtbar sein.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 23 · Block 4/4 · Conclusion, Grenzen und Projektbezug
- **حالت / بلوک:** article، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Conclusion und relevante Limitations lesen; nur gezielt zu markierten Lücken zurückspringen. Fokus: Method result and limits.
- **امروز نخوان:** Den Artikel nicht pauschal von vorn lesen und keine neue Vollübersetzung beginnen.
- **پرسش راهنما:** Was behauptet dieser kleine Abschnitt zu „Method result and limits“ und was unterstützt er für das Projekt?
- **مدرک تحقیق:** `article-23-block-4.md`
- **قانون توقف:** Stoppe nach einer verstandenen Einheit, höchstens zwei notwendigen Begriffen, drei eigenen Sätzen und einem Seitenbeleg. Nicht wegen offener Seiten weiterlesen.

#### پیش‌نیازهای کوتاه

- [What is a graph database?](https://neo4j.com/docs/getting-started/graph-database/) — Neo4j Documentation، 15 دقیقه
  - **بخوان:** Nodes, relationships, properties, data model, indexes und constraints.
  - **به‌کار ببر:** Entscheide, was Entität, Beziehung oder Property ist, und begründe es mit einer Projektfrage.
- [Get started with Cypher](https://neo4j.com/docs/getting-started/cypher/intro-tutorial/) — Neo4j Documentation، 20 دقیقه
  - **بخوان:** Create the Movie Graph und die ersten MATCH-, CREATE- und MERGE-Beispiele.
  - **به‌کار ببر:** Übertrage das Muster auf Evidence-Nodes und gerichtete Beziehungen; teste Idempotenz mit MERGE.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Importiere Repository bis Method <!-- w13-d4-t1-i1 -->
- [ ] Importiere DatabaseObject und EvidenceRecord <!-- w13-d4-t1-i2 -->
- [ ] Dokumentiere Counts vor und nach dem Import <!-- w13-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 10.2, § 38.8 <!-- w13-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Graph / Import aus <!-- w13-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w13-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: NodeImporter.cs <!-- w13-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w13-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w13-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-01-14 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w18-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-18-integration-evidence.md` |
| منبع‌ها | Lekssays 2025: LLMxCPG؛ [Neo4j: Data Modeling](https://neo4j.com/docs/getting-started/data-modeling/)؛ [Yamaguchi et al. 2014: Code Property Graphs](https://drive.google.com/file/d/1SGWMjZA8Im9fXsuZxr6KnKdgijDH4o8r/view)؛ [Xie et al. 2026: CodeFuse Query](https://drive.google.com/file/d/1cfU7FbjkIRSamwvWKbL3pTH_EC0V-ObB/view)؛ [Neo4j GraphAcademy: Cypher Fundamentals](https://graphacademy.neo4j.com/courses/cypher-fundamentals) |
| بخش‌های Exposé | 3.3, 10.3, 38.8, 3.3.10 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Artikel 23: frei erklären und abschließen
- **حالت / بلوک:** article، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Lektüre. Nur markierte Stellen öffnen, wenn beim freien Erklären eine konkrete Lücke sichtbar wird.
- **امروز نخوان:** Nicht von vorn beginnen, nicht alles erneut übersetzen und keine neuen Nebenquellen öffnen.
- **پرسش راهنما:** Kann ich Problem, Methode, Ergebnis, Grenze und Projektbezug zuerst auf Persisch und danach kurz auf Englisch erklären?
- **مدرک تحقیق:** `article-23-teachback-and-project-link.md`
- **قانون توقف:** Stoppe, sobald fünf Punkte frei erklärt, mit Seitenbelegen verbunden und als A/B/C-Entscheidung gespeichert sind.

#### پیش‌نیازهای کوتاه

- [What is a graph database?](https://neo4j.com/docs/getting-started/graph-database/) — Neo4j Documentation، 15 دقیقه
  - **بخوان:** Nodes, relationships, properties, data model, indexes und constraints.
  - **به‌کار ببر:** Entscheide, was Entität, Beziehung oder Property ist, und begründe es mit einer Projektfrage.
- [Get started with Cypher](https://neo4j.com/docs/getting-started/cypher/intro-tutorial/) — Neo4j Documentation، 20 دقیقه
  - **بخوان:** Create the Movie Graph und die ersten MATCH-, CREATE- und MERGE-Beispiele.
  - **به‌کار ببر:** Übertrage das Muster auf Evidence-Nodes und gerichtete Beziehungen; teste Idempotenz mit MERGE.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w18-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w18-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w18-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.3, § 10.3, § 38.8, § 3.3.10 <!-- capacity-w18-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w18-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w18-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-18-integration-evidence.md <!-- capacity-w18-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w18-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w18-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 19 — Graph Schema und Import → Flat Baseline produktionsreif machen

- **فاز:** Phase 4: Neo4j Graph / NLP-Lab Integration 1
- **هدف هفته:** Das Evidence Model wird nach Neo4j übertragen, ohne seine wissenschaftliche Bedeutung an den Storage zu binden. Die Ergebnisse des Live-Kurses werden in einen deterministischen, getesteten Flat Retriever überführt.
- **خروجی الزامی هفته:** `week-19-integration-evidence.md` (روز `capacity-w19-integration`)
- **بازه:** 2027-01-15 تا 2027-01-21

### روز 1 — 2027-01-15 — Relationship Import

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w13-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Graph / Import |
| خروجی روز | `RelationshipImporter.cs` |
| منبع‌ها | [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 3.3.7, 38.8 |

**دلیل:** Kanten müssen Claim Type und Provenance erhalten.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Graph / Import bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Importiere INVOKES, MAPS_TO, MUTATES und PERSISTS
- **مدرک تحقیق:** `week-19-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [What is a graph database?](https://neo4j.com/docs/getting-started/graph-database/) — Neo4j Documentation، 15 دقیقه
  - **بخوان:** Nodes, relationships, properties, data model, indexes und constraints.
  - **به‌کار ببر:** Entscheide, was Entität, Beziehung oder Property ist, und begründe es mit einer Projektfrage.
- [Get started with Cypher](https://neo4j.com/docs/getting-started/cypher/intro-tutorial/) — Neo4j Documentation، 20 دقیقه
  - **بخوان:** Create the Movie Graph und die ersten MATCH-, CREATE- und MERGE-Beispiele.
  - **به‌کار ببر:** Übertrage das Muster auf Evidence-Nodes und gerichtete Beziehungen; teste Idempotenz mit MERGE.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Importiere INVOKES, MAPS_TO, MUTATES und PERSISTS <!-- w13-d5-t1-i1 -->
- [ ] Verbinde READS_FROM und WRITES_TO mit Evidenz <!-- w13-d5-t1-i2 -->
- [ ] Lösche ungelöste Ziele nicht <!-- w13-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.3.7, § 38.8 <!-- w13-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Graph / Import aus <!-- w13-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w13-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: RelationshipImporter.cs <!-- w13-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w13-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w13-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-01-18 — Idempotenter Graph Build

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w13-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Graph / Integration |
| خروجی روز | `graph-build-report.json` |
| منبع‌ها | [Xie et al. 2026: CodeFuse Query](https://drive.google.com/file/d/1cfU7FbjkIRSamwvWKbL3pTH_EC0V-ObB/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 11.3, 17, 38.10 |

**دلیل:** Zwei identische Läufe müssen gleiche Counts und Query-Antworten liefern.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Graph / Integration bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Prüfe auf doppelte Nodes und Edges
- **مدرک تحقیق:** `week-19-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [What is a graph database?](https://neo4j.com/docs/getting-started/graph-database/) — Neo4j Documentation، 15 دقیقه
  - **بخوان:** Nodes, relationships, properties, data model, indexes und constraints.
  - **به‌کار ببر:** Entscheide, was Entität, Beziehung oder Property ist, und begründe es mit einer Projektfrage.
- [Get started with Cypher](https://neo4j.com/docs/getting-started/cypher/intro-tutorial/) — Neo4j Documentation، 20 دقیقه
  - **بخوان:** Create the Movie Graph und die ersten MATCH-, CREATE- und MERGE-Beispiele.
  - **به‌کار ببر:** Übertrage das Muster auf Evidence-Nodes und gerichtete Beziehungen; teste Idempotenz mit MERGE.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Baue den Graphen zweimal <!-- w13-d6-t1-i1 -->
- [ ] Prüfe auf doppelte Nodes und Edges <!-- w13-d6-t1-i2 -->
- [ ] Vergleiche Run Manifest und Counts <!-- w13-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 11.3, § 17, § 38.10 <!-- w13-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Graph / Integration aus <!-- w13-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w13-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: graph-build-report.json <!-- w13-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w13-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w13-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-01-19 — Kursartefakte prüfen und einfrieren

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w14-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | NLP Retrieval Lab / Release |
| خروجی روز | `course-artifact-manifest-v1.yaml` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [scikit-learn: Text Feature Extraction und TF-IDF](https://scikit-learn.org/stable/modules/feature_extraction.html)؛ [scikit-learn: Cosine Similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html) |
| بخش‌های Exposé | 7.2, 11.3, 17 |

**دلیل:** Nur nachvollziehbare Kursartefakte dürfen die Thesis-Baseline beeinflussen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu NLP Retrieval Lab / Release bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Versioniere Konfiguration und Fixture
- **مدرک تحقیق:** `week-19-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Prüfe alle zehn Definition-of-Done-Gates <!-- w14-d1-t1-i1 -->
- [ ] Trenne Notebook, Produktionscode und Bericht <!-- w14-d1-t1-i2 -->
- [ ] Versioniere Konfiguration und Fixture <!-- w14-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.2, § 11.3, § 17 <!-- w14-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in NLP Retrieval Lab / Release aus <!-- w14-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w14-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: course-artifact-manifest-v1.yaml <!-- w14-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w14-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w14-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-01-20 — Code-Aware Tokenizer implementieren

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w14-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Retrieval.Flat / CodeAwareTokenizer |
| خروجی روز | `CodeAwareTokenizer + 12 passing tests` |
| منبع‌ها | [Microsoft Learn: Roslyn Syntax Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/syntax-analysis)؛ [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740) |
| بخش‌های Exposé | 3.1.3 bis 3.1.4, 38.2, 38.4 |

**دلیل:** Der produktive Tokenizer muss Source Spans bewahren und reproduzierbar sein.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Retrieval.Flat / CodeAwareTokenizer bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Führe die zwölf Kurs-Fixtures aus
- **مدرک تحقیق:** `week-19-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Implementiere camelCase und snake_case <!-- w14-d2-t1-i1 -->
- [ ] Bewahre qualifizierte Namen und SourceLocation <!-- w14-d2-t1-i2 -->
- [ ] Führe die zwölf Kurs-Fixtures aus <!-- w14-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.1.3 bis 3.1.4, § 38.2, § 38.4 <!-- w14-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Retrieval.Flat / CodeAwareTokenizer aus <!-- w14-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w14-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: CodeAwareTokenizer + 12 passing tests <!-- w14-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w14-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w14-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-01-21 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w19-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-19-integration-evidence.md` |
| منبع‌ها | [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Xie et al. 2026: CodeFuse Query](https://drive.google.com/file/d/1cfU7FbjkIRSamwvWKbL3pTH_EC0V-ObB/view)؛ [scikit-learn: Text Feature Extraction und TF-IDF](https://scikit-learn.org/stable/modules/feature_extraction.html) |
| بخش‌های Exposé | 3.3.7, 38.8, 11.3, 17 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-19-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [What is a graph database?](https://neo4j.com/docs/getting-started/graph-database/) — Neo4j Documentation، 15 دقیقه
  - **بخوان:** Nodes, relationships, properties, data model, indexes und constraints.
  - **به‌کار ببر:** Entscheide, was Entität, Beziehung oder Property ist, und begründe es mit einer Projektfrage.
- [Get started with Cypher](https://neo4j.com/docs/getting-started/cypher/intro-tutorial/) — Neo4j Documentation، 20 دقیقه
  - **بخوان:** Create the Movie Graph und die ersten MATCH-, CREATE- und MERGE-Beispiele.
  - **به‌کار ببر:** Übertrage das Muster auf Evidence-Nodes und gerichtete Beziehungen; teste Idempotenz mit MERGE.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w19-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w19-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w19-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.3.7, § 38.8, § 11.3, § 17 <!-- capacity-w19-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w19-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w19-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-19-integration-evidence.md <!-- capacity-w19-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w19-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w19-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 20 — Flat Baseline produktionsreif machen

- **فاز:** NLP-Lab Integration 1
- **هدف هفته:** Die Ergebnisse des Live-Kurses werden in einen deterministischen, getesteten Flat Retriever überführt.
- **خروجی الزامی هفته:** `week-20-integration-evidence.md` (روز `capacity-w20-integration`)
- **بازه:** 2027-01-22 تا 2027-01-28

### روز 1 — 2027-01-22 — TF-IDF Index bauen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w14-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Retrieval.Flat / Index |
| خروجی روز | `tfidf-index-v1 + config hash` |
| منبع‌ها | [scikit-learn: Text Feature Extraction und TF-IDF](https://scikit-learn.org/stable/modules/feature_extraction.html)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 9.3, 13.2, 29.3 |

**دلیل:** Die zentrale Flat Baseline benötigt einen eingefrorenen Corpus und versionierte Parameter.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Retrieval.Flat / Index bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Lade nur CorpusManifest-Einträge
- **مدرک تحقیق:** `week-20-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Lade nur CorpusManifest-Einträge <!-- w14-d3-t1-i1 -->
- [ ] Versioniere n-gram, min_df und Stop-Tokens <!-- w14-d3-t1-i2 -->
- [ ] Speichere ConfigHash und CorpusCommit <!-- w14-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 9.3, § 13.2, § 29.3 <!-- w14-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Retrieval.Flat / Index aus <!-- w14-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w14-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: tfidf-index-v1 + config hash <!-- w14-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w14-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w14-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-01-25 — Cosine Ranker und top-k stabilisieren

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w14-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Retrieval.Flat / Ranker |
| خروجی روز | `cosine-ranker + golden ranking tests` |
| منبع‌ها | [scikit-learn: Cosine Similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view) |
| بخش‌های Exposé | 14.2, 29.3, 38.10 |

**دلیل:** Ranking muss bei gleichen Scores einen festen Tie-break besitzen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Retrieval.Flat / Ranker bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Definiere Tie-break über stabile Candidate-ID
- **مدرک تحقیق:** `week-20-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Implementiere cosine score <!-- w14-d4-t1-i1 -->
- [ ] Definiere Tie-break über stabile Candidate-ID <!-- w14-d4-t1-i2 -->
- [ ] Teste k=1, 5 und 10 <!-- w14-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 14.2, § 29.3, § 38.10 <!-- w14-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Retrieval.Flat / Ranker aus <!-- w14-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w14-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: cosine-ranker + golden ranking tests <!-- w14-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w14-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w14-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-01-26 — RetrievalRun-Vertrag implementieren

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w14-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Contracts / RetrievalRun |
| خروجی روز | `retrieval-run.schema.json + fixtures` |
| منبع‌ها | [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 3.2, 3.6, 38.2 |

**دلیل:** Cross App und Evaluation dürfen nicht von internen Klassen des Labs abhängen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Contracts / RetrievalRun bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Erzeuge gültige und ungültige Fixtures
- **مدرک تحقیق:** `week-20-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Validiere runId, queryId und candidates <!-- w14-d5-t1-i1 -->
- [ ] Ergänze Evidence IDs und AnswerStatus <!-- w14-d5-t1-i2 -->
- [ ] Erzeuge gültige und ungültige Fixtures <!-- w14-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.2, § 3.6, § 38.2 <!-- w14-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Contracts / RetrievalRun aus <!-- w14-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w14-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: retrieval-run.schema.json + fixtures <!-- w14-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w14-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w14-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-01-27 — Flat Baseline Release Gate

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w14-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | NLP Retrieval Lab / Baseline |
| خروجی روز | `flat-baseline-v1-release-report.md` |
| منبع‌ها | [scikit-learn: Text Feature Extraction und TF-IDF](https://scikit-learn.org/stable/modules/feature_extraction.html)؛ [scikit-learn: Cosine Similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 7.2, 14.2, 17 |

**دلیل:** Die Baseline muss unabhängig startbar und testbar sein, bevor Graph-Vergleich beginnt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu NLP Retrieval Lab / Baseline bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Dokumentiere bekannte Grenzen
- **مدرک تحقیق:** `week-20-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Führe Clean Build und Tests aus <!-- w14-d6-t1-i1 -->
- [ ] Messe Recall@k, MRR und Laufzeit auf dem Pilot <!-- w14-d6-t1-i2 -->
- [ ] Dokumentiere bekannte Grenzen <!-- w14-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.2, § 14.2, § 17 <!-- w14-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in NLP Retrieval Lab / Baseline aus <!-- w14-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w14-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: flat-baseline-v1-release-report.md <!-- w14-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w14-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w14-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-01-28 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w20-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-20-integration-evidence.md` |
| منبع‌ها | [scikit-learn: Text Feature Extraction und TF-IDF](https://scikit-learn.org/stable/modules/feature_extraction.html)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [scikit-learn: Cosine Similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view) |
| بخش‌های Exposé | 9.3, 13.2, 29.3, 14.2 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-20-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Best practices for writing unit tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) — Microsoft Learn، 15 دقیقه
  - **بخوان:** Characteristics of a good unit test, naming und Arrange-Act-Assert.
  - **به‌کار ببر:** Baue einen kleinen deterministischen Test mit verständlichem Namen und nur einem klaren Verhalten.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w20-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w20-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w20-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 9.3, § 13.2, § 29.3, § 14.2 <!-- capacity-w20-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w20-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w20-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-20-integration-evidence.md <!-- capacity-w20-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w20-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w20-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 21 — Question Contracts und optionale Semantik

- **فاز:** NLP-Lab Integration 2
- **هدف هفته:** Fragen werden sicher strukturiert; neuronale Optionen erhalten einen messbaren Go/No-Go-Gate.
- **خروجی الزامی هفته:** `week-21-integration-evidence.md` (روز `capacity-w21-integration`)
- **بازه:** 2027-01-29 تا 2027-02-04

### روز 1 — 2027-01-29 — QuestionContract finalisieren

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w15-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | QueryContracts |
| خروجی روز | `question-contract.schema.json` |
| منبع‌ها | [Keras-Beispiel: Character-level Seq2Seq](https://keras.io/examples/nlp/lstm_seq2seq/)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 3.6.2, 33.3, 38.2 |

**دلیل:** Natürliche Sprache darf nur in erlaubte, validierbare Query-Felder überführt werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu QueryContracts bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Definiere role, intent, entities und constraints
- **مدرک تحقیق:** `week-21-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere role, intent, entities und constraints <!-- w15-d1-t1-i1 -->
- [ ] Verbiete unbekannte Felder <!-- w15-d1-t1-i2 -->
- [ ] Modelliere Validierungsfehler explizit <!-- w15-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.6.2, § 33.3, § 38.2 <!-- w15-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in QueryContracts aus <!-- w15-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w15-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: question-contract.schema.json <!-- w15-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w15-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w15-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-02-01 — Question-to-JSON Fixtures

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w15-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | QueryContracts / Fixtures |
| خروجی روز | `question-contract-fixtures.json` |
| منبع‌ها | [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) |
| بخش‌های Exposé | 25, 26, 33.3 |

**دلیل:** Drei Rollen benötigen reproduzierbare Beispiele statt freier Prompt-Ausgabe.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu QueryContracts / Fixtures bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Erstelle Architect-Frage
- **مدرک تحقیق:** `week-21-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erstelle Developer-Frage <!-- w15-d2-t1-i1 -->
- [ ] Erstelle Architect-Frage <!-- w15-d2-t1-i2 -->
- [ ] Erstelle QA-Frage plus invalid case <!-- w15-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 25, § 26, § 33.3 <!-- w15-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in QueryContracts / Fixtures aus <!-- w15-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w15-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: question-contract-fixtures.json <!-- w15-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w15-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w15-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-02-02 — Embedding-Experiment reproduzieren

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w15-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Retrieval.Neural / Experiment |
| خروجی روز | `embedding-vs-tfidf-results.csv` |
| منبع‌ها | [Keras 3: Embedding Layer](https://keras.io/api/layers/core_layers/embedding/)؛ [Guo et al. 2021: GraphCodeBERT](https://arxiv.org/pdf/2009.08366) |
| بخش‌های Exposé | 7.2, 8.2, 29.3 |

**دلیل:** Ein optionaler semantischer Retriever muss exakt gegen TF-IDF messbar sein.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Retrieval.Neural / Experiment bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Messe Recall@k, MRR und Laufzeit
- **مدرک تحقیق:** `week-21-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Hugging Face LLM Course introduction](https://huggingface.co/docs/course/chapter1/1) — Hugging Face، 15 دقیقه
  - **بخوان:** Nur Introduction und die Übersicht zu Transformers, Datasets und Tokenizers.
  - **به‌کار ببر:** Nutze die Begriffe, um den optionalen Modellversuch zu verstehen; erweitere damit nicht automatisch den Thesis-Scope.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Nutze denselben Corpus und dieselben Fragen <!-- w15-d3-t1-i1 -->
- [ ] Fixiere Modell und Seed <!-- w15-d3-t1-i2 -->
- [ ] Messe Recall@k, MRR und Laufzeit <!-- w15-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.2, § 8.2, § 29.3 <!-- w15-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Retrieval.Neural / Experiment aus <!-- w15-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w15-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: embedding-vs-tfidf-results.csv <!-- w15-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w15-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w15-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-02-03 — RNN/LSTM/GRU Scope Audit

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w15-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Architecture / Scope |
| خروجی روز | `ADR-005-sequence-models.md` |
| منبع‌ها | [Keras 3: SimpleRNN](https://keras.io/api/layers/recurrent_layers/simple_rnn/)؛ [Keras 3: LSTM](https://keras.io/api/layers/recurrent_layers/lstm/)؛ [Keras 3: GRU](https://keras.io/api/layers/recurrent_layers/gru/) |
| بخش‌های Exposé | 8, 31, 37.3 |

**دلیل:** Kurswissen darf nicht ohne Datengrundlage zu Thesis-Scope werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Architecture / Scope bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Dokumentiere Kosten und Reproduzierbarkeit
- **مدرک تحقیق:** `week-21-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Hugging Face LLM Course introduction](https://huggingface.co/docs/course/chapter1/1) — Hugging Face، 15 دقیقه
  - **بخوان:** Nur Introduction und die Übersicht zu Transformers, Datasets und Tokenizers.
  - **به‌کار ببر:** Nutze die Begriffe, um den optionalen Modellversuch zu verstehen; erweitere damit nicht automatisch den Thesis-Scope.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Prüfe Dataset-Größe und Labels <!-- w15-d4-t1-i1 -->
- [ ] Prüfe Nutzen für RQ1/RQ2 <!-- w15-d4-t1-i2 -->
- [ ] Dokumentiere Kosten und Reproduzierbarkeit <!-- w15-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 8, § 31, § 37.3 <!-- w15-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Architecture / Scope aus <!-- w15-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w15-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: ADR-005-sequence-models.md <!-- w15-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w15-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w15-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-02-04 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w21-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-21-integration-evidence.md` |
| منبع‌ها | [Keras-Beispiel: Character-level Seq2Seq](https://keras.io/examples/nlp/lstm_seq2seq/)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) |
| بخش‌های Exposé | 3.6.2, 33.3, 38.2, 25 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-21-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Hugging Face LLM Course introduction](https://huggingface.co/docs/course/chapter1/1) — Hugging Face، 15 دقیقه
  - **بخوان:** Nur Introduction und die Übersicht zu Transformers, Datasets und Tokenizers.
  - **به‌کار ببر:** Nutze die Begriffe, um den optionalen Modellversuch zu verstehen; erweitere damit nicht automatisch den Thesis-Scope.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w21-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w21-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w21-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.6.2, § 33.3, § 38.2, § 25 <!-- capacity-w21-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w21-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w21-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-21-integration-evidence.md <!-- capacity-w21-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w21-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w21-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 22 — Question Contracts und optionale Semantik → Grounded Answering und Cross-App-Vertrag

- **فاز:** NLP-Lab Integration 2 / NLP-Lab Integration 3
- **هدف هفته:** Fragen werden sicher strukturiert; neuronale Optionen erhalten einen messbaren Go/No-Go-Gate. Retriever, Verifier und Antwortformat werden getrennt und über einen getesteten Vertrag verbunden.
- **خروجی الزامی هفته:** `week-22-integration-evidence.md` (روز `capacity-w22-integration`)
- **بازه:** 2027-02-05 تا 2027-02-11

### روز 1 — 2027-02-05 — BERT/GraphCodeBERT Go-No-Go

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w15-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Retrieval.Neural / Decision |
| خروجی روز | `bert-retrieval-adr.md` |
| منبع‌ها | [Devlin et al. 2019: BERT](https://aclanthology.org/N19-1423/)؛ [Guo et al. 2021: GraphCodeBERT](https://arxiv.org/pdf/2009.08366) |
| بخش‌های Exposé | 4.3, 8.2, 37.2 |

**دلیل:** Neural Retrieval wird nur bei messbarem Mehrwert und vertretbaren Kosten weitergeführt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Retrieval.Neural / Decision bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Vergleiche mit Flat baseline
- **مدرک تحقیق:** `week-22-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Hugging Face LLM Course introduction](https://huggingface.co/docs/course/chapter1/1) — Hugging Face، 15 دقیقه
  - **بخوان:** Nur Introduction und die Übersicht zu Transformers, Datasets und Tokenizers.
  - **به‌کار ببر:** Nutze die Begriffe, um den optionalen Modellversuch zu verstehen; erweitere damit nicht automatisch den Thesis-Scope.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Vergleiche mit Flat baseline <!-- w15-d5-t1-i1 -->
- [ ] Prüfe Data-flow-Nutzen <!-- w15-d5-t1-i2 -->
- [ ] Lege Stop-Schwelle vor Ergebnis fest <!-- w15-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 4.3, § 8.2, § 37.2 <!-- w15-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Retrieval.Neural / Decision aus <!-- w15-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w15-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: bert-retrieval-adr.md <!-- w15-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w15-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w15-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-02-08 — Semantic Experiment Gate

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w15-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | NLP Retrieval Lab / Decision |
| خروجی روز | `semantic-experiment-gate.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) |
| بخش‌های Exposé | 16, 20, 37 |

**دلیل:** Die Woche endet mit einer Entscheidung, nicht mit mehreren halbfertigen Modellen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu NLP Retrieval Lab / Decision bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Entscheide Core, optional oder Future
- **مدرک تحقیق:** `week-22-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Hugging Face LLM Course introduction](https://huggingface.co/docs/course/chapter1/1) — Hugging Face، 15 دقیقه
  - **بخوان:** Nur Introduction und die Übersicht zu Transformers, Datasets und Tokenizers.
  - **به‌کار ببر:** Nutze die Begriffe, um den optionalen Modellversuch zu verstehen; erweitere damit nicht automatisch den Thesis-Scope.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Prüfe alle Messdaten <!-- w15-d6-t1-i1 -->
- [ ] Entscheide Core, optional oder Future <!-- w15-d6-t1-i2 -->
- [ ] Versioniere Config, Ergebnis und ADR <!-- w15-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 16, § 20, § 37 <!-- w15-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in NLP Retrieval Lab / Decision aus <!-- w15-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w15-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: semantic-experiment-gate.md <!-- w15-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w15-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w15-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-02-09 — Claim-Evidence-Vertrag

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w16-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Answering / Contract |
| خروجی روز | `answer-contract.schema.json` |
| منبع‌ها | [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252)؛ [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view) |
| بخش‌های Exposé | 3.6, 14.3, 27 |

**دلیل:** Jede Antwort benötigt explizite Claims, Evidence IDs und einen AnswerStatus.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Answering / Contract bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verbiete Text ohne referenzierte Evidenz
- **مدرک تحقیق:** `week-22-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere Claim und Evidence-Referenz <!-- w16-d1-t1-i1 -->
- [ ] Definiere SUPPORTED, PARTIAL und NOT_ANSWERABLE <!-- w16-d1-t1-i2 -->
- [ ] Verbiete Text ohne referenzierte Evidenz <!-- w16-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.6, § 14.3, § 27 <!-- w16-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Answering / Contract aus <!-- w16-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w16-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: answer-contract.schema.json <!-- w16-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w16-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w16-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-02-10 — Verifier-Grenze implementieren

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w16-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Verifier |
| خروجی روز | `answer-verifier + refusal tests` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view) |
| بخش‌های Exposé | 3.2, 3.6, 38.9 |

**دلیل:** Retriever-Scores dürfen keine strukturellen Claims bestätigen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Verifier bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Erzeuge Correct-Refusal-Fixtures
- **مدرک تحقیق:** `week-22-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Retrieval augmented generation and indexes](https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation) — Microsoft Learn، 18 دقیقه
  - **بخوان:** What is RAG?, Retrieve–Augment–Generate und Limitations and troubleshooting.
  - **به‌کار ببر:** Trenne Retrieval, Grounding, Generation, Citation und Verhalten bei unzureichender Evidenz.
- [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — OWASP GenAI Security Project، 15 دقیقه
  - **بخوان:** Description, attack scenarios und prevention/mitigation; beachte, dass RAG Prompt Injection nicht beseitigt.
  - **به‌کار ببر:** Behandle Dokumentinhalt als nicht vertrauenswürdige Daten und teste einen Refusal- oder Guardrail-Fall.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Prüfe Evidence-ID-Auflösung <!-- w16-d2-t1-i1 -->
- [ ] Prüfe widersprüchliche Evidence <!-- w16-d2-t1-i2 -->
- [ ] Erzeuge Correct-Refusal-Fixtures <!-- w16-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.2, § 3.6, § 38.9 <!-- w16-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Verifier aus <!-- w16-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w16-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: answer-verifier + refusal tests <!-- w16-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w16-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w16-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-02-11 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w22-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-22-integration-evidence.md` |
| منبع‌ها | [Devlin et al. 2019: BERT](https://aclanthology.org/N19-1423/)؛ [Guo et al. 2021: GraphCodeBERT](https://arxiv.org/pdf/2009.08366)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) |
| بخش‌های Exposé | 4.3, 8.2, 37.2, 16 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-22-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Hugging Face LLM Course introduction](https://huggingface.co/docs/course/chapter1/1) — Hugging Face، 15 دقیقه
  - **بخوان:** Nur Introduction und die Übersicht zu Transformers, Datasets und Tokenizers.
  - **به‌کار ببر:** Nutze die Begriffe, um den optionalen Modellversuch zu verstehen; erweitere damit nicht automatisch den Thesis-Scope.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w22-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w22-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w22-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 4.3, § 8.2, § 37.2, § 16 <!-- capacity-w22-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w22-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w22-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-22-integration-evidence.md <!-- capacity-w22-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w22-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w22-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 23 — Grounded Answering und Cross-App-Vertrag

- **فاز:** NLP-Lab Integration 3
- **هدف هفته:** Retriever, Verifier und Antwortformat werden getrennt und über einen getesteten Vertrag verbunden.
- **خروجی الزامی هفته:** `week-23-integration-evidence.md` (روز `capacity-w23-integration`)
- **بازه:** 2027-02-12 تا 2027-02-18

### روز 1 — 2027-02-12 — RAG-Orchestrierung ohne Halluzination

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w16-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Answering / RAG |
| خروجی روز | `grounded-rag-flow.mmd + integration test` |
| منبع‌ها | [Lewis et al. 2020: Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) |
| بخش‌های Exposé | 7.2, 14.2, 33 |

**دلیل:** Generation darf nur nach Retrieval und Verifikation stattfinden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Answering / RAG bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Trenne Retriever, Verifier und Generator
- **مدرک تحقیق:** `week-23-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Retrieval augmented generation and indexes](https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation) — Microsoft Learn، 18 دقیقه
  - **بخوان:** What is RAG?, Retrieve–Augment–Generate und Limitations and troubleshooting.
  - **به‌کار ببر:** Trenne Retrieval, Grounding, Generation, Citation und Verhalten bei unzureichender Evidenz.
- [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — OWASP GenAI Security Project، 15 دقیقه
  - **بخوان:** Description, attack scenarios und prevention/mitigation; beachte, dass RAG Prompt Injection nicht beseitigt.
  - **به‌کار ببر:** Behandle Dokumentinhalt als nicht vertrauenswürdige Daten und teste einen Refusal- oder Guardrail-Fall.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Trenne Retriever, Verifier und Generator <!-- w16-d3-t1-i1 -->
- [ ] Stoppe bei NOT_ANSWERABLE <!-- w16-d3-t1-i2 -->
- [ ] Protokolliere verwendete Evidence IDs <!-- w16-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.2, § 14.2, § 33 <!-- w16-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Answering / RAG aus <!-- w16-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w16-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: grounded-rag-flow.mmd + integration test <!-- w16-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w16-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w16-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-02-15 — Rollenformat für Developer, Architect und QA

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w16-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Answering / Views |
| خروجی روز | `role-output-contracts.yaml` |
| منبع‌ها | [Radford et al. 2019: Language Models are Unsupervised Multitask Learners](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view) |
| بخش‌های Exposé | 25, 26, 33.3 |

**دلیل:** Die Darstellung variiert nach Rolle, nicht die zugrunde liegende Evidenz.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Answering / Views bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Nutze denselben RetrievalRun
- **مدرک تحقیق:** `week-23-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Personas: Study Guide](https://www.nngroup.com/articles/personas-study-guide/) — Nielsen Norman Group، 15 دقیقه
  - **بخوان:** What Is a Persona? sowie die ersten Hinweise unter How to Create Personas.
  - **به‌کار ببر:** Beschreibe Developer, Architect und QA anhand von Ziel, Entscheidung, Kontext und Informationsbedarf statt nur anhand ihrer Jobtitel.
- [Learning about users and their needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) — GOV.UK Service Manual، 15 دقیقه
  - **بخوان:** Understanding user needs, Writing user needs und Linking user needs to user stories.
  - **به‌کار ببر:** Schreibe jeden Bedarf als Ziel und Nutzen; behandle unbelegte Annahmen ausdrücklich als Annahmen.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere drei Output Views <!-- w16-d4-t1-i1 -->
- [ ] Nutze denselben RetrievalRun <!-- w16-d4-t1-i2 -->
- [ ] Teste Verbot veränderter Claims <!-- w16-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 25, § 26, § 33.3 <!-- w16-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Answering / Views aus <!-- w16-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w16-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: role-output-contracts.yaml <!-- w16-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w16-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w16-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-02-16 — Evaluationsgrenze ROUGE/BLEU

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w16-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / Metrics |
| خروجی روز | `rag-metrics-boundary.md` |
| منبع‌ها | [Papineni et al. 2002: BLEU](https://aclanthology.org/P02-1040/)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 14.2, 14.3, 29.3 |

**دلیل:** Textähnlichkeit ist sekundär zu Evidenzvollständigkeit und korrekter Ablehnung.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation / Metrics bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Dokumentiere Failure-Beispiele
- **مدرک تحقیق:** `week-23-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Retrieval augmented generation and indexes](https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation) — Microsoft Learn، 18 دقیقه
  - **بخوان:** What is RAG?, Retrieve–Augment–Generate und Limitations and troubleshooting.
  - **به‌کار ببر:** Trenne Retrieval, Grounding, Generation, Citation und Verhalten bei unzureichender Evidenz.
- [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — OWASP GenAI Security Project، 15 دقیقه
  - **بخوان:** Description, attack scenarios und prevention/mitigation; beachte, dass RAG Prompt Injection nicht beseitigt.
  - **به‌کار ببر:** Behandle Dokumentinhalt als nicht vertrauenswürdige Daten und teste einen Refusal- oder Guardrail-Fall.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere primäre RQ2-Metriken <!-- w16-d5-t1-i1 -->
- [ ] Ordne ROUGE/BLEU als sekundär ein <!-- w16-d5-t1-i2 -->
- [ ] Dokumentiere Failure-Beispiele <!-- w16-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 14.2, § 14.3, § 29.3 <!-- w16-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / Metrics aus <!-- w16-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w16-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: rag-metrics-boundary.md <!-- w16-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w16-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w16-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-02-17 — Cross-App Integration Gate

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w16-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Cross App / NLP Adapter |
| خروجی روز | `nlp-lab-integration-readiness.md + E2E test` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Xie et al. 2026: CodeFuse Query](https://drive.google.com/file/d/1cfU7FbjkIRSamwvWKbL3pTH_EC0V-ObB/view) |
| بخش‌های Exposé | 16, 17, 20 |

**دلیل:** Das Lab wird nur über einen stabilen Vertrag und bestandene E2E-Prüfung verbunden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Cross App / NLP Adapter bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Erzeuge Installations- und Rollback-Notiz
- **مدرک تحقیق:** `week-23-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Retrieval augmented generation and indexes](https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation) — Microsoft Learn، 18 دقیقه
  - **بخوان:** What is RAG?, Retrieve–Augment–Generate und Limitations and troubleshooting.
  - **به‌کار ببر:** Trenne Retrieval, Grounding, Generation, Citation und Verhalten bei unzureichender Evidenz.
- [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — OWASP GenAI Security Project، 15 دقیقه
  - **بخوان:** Description, attack scenarios und prevention/mitigation; beachte, dass RAG Prompt Injection nicht beseitigt.
  - **به‌کار ببر:** Behandle Dokumentinhalt als nicht vertrauenswürdige Daten und teste einen Refusal- oder Guardrail-Fall.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Validiere RetrievalRun im Adapter <!-- w16-d6-t1-i1 -->
- [ ] Teste Flat, Graph und Refusal <!-- w16-d6-t1-i2 -->
- [ ] Erzeuge Installations- und Rollback-Notiz <!-- w16-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 16, § 17, § 20 <!-- w16-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Cross App / NLP Adapter aus <!-- w16-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w16-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: nlp-lab-integration-readiness.md + E2E test <!-- w16-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w16-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w16-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-02-18 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w23-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-23-integration-evidence.md` |
| منبع‌ها | [Lewis et al. 2020: Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252)؛ [Radford et al. 2019: Language Models are Unsupervised Multitask Learners](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view) |
| بخش‌های Exposé | 7.2, 14.2, 33, 25 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-23-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Retrieval augmented generation and indexes](https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation) — Microsoft Learn، 18 دقیقه
  - **بخوان:** What is RAG?, Retrieve–Augment–Generate und Limitations and troubleshooting.
  - **به‌کار ببر:** Trenne Retrieval, Grounding, Generation, Citation und Verhalten bei unzureichender Evidenz.
- [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — OWASP GenAI Security Project، 15 دقیقه
  - **بخوان:** Description, attack scenarios und prevention/mitigation; beachte, dass RAG Prompt Injection nicht beseitigt.
  - **به‌کار ببر:** Behandle Dokumentinhalt als nicht vertrauenswürdige Daten und teste einen Refusal- oder Guardrail-Fall.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w23-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w23-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w23-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.2, § 14.2, § 33, § 25 <!-- capacity-w23-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w23-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w23-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-23-integration-evidence.md <!-- capacity-w23-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w23-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w23-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 24 — Flat vs. Graph und Query Contracts

- **فاز:** Phase 4: Retrieval und Query
- **هدف هفته:** Zwei Retrieval-Methoden werden auf derselben Evidenz und mit festen Fragen verglichen.
- **خروجی الزامی هفته:** `week-24-integration-evidence.md` (روز `capacity-w24-integration`)
- **بازه:** 2027-02-19 تا 2027-02-25

### روز 1 — 2027-02-19 — Question Contract Schema

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w17-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | QueryContracts |
| خروجی روز | `question-contract.schema.json` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view) |
| بخش‌های Exposé | 3.6.2, 13.3, 33.3, 38.9 |

**دلیل:** Jede Frage braucht eine definierte Rolle, ein Ziel und Evidenzanforderungen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu QueryContracts bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Leite QuestionTypes aus den Use Cases ab
- **مدرک تحقیق:** `week-24-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Creating your first JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) — JSON Schema، 18 دقیقه
  - **بخوان:** Create a schema definition, Define properties und Validate JSON data.
  - **به‌کار ببر:** Definiere Pflichtfelder, Typen und ungültige Beispiele für den Vertrag des Tages.
- [JSON Lines format](https://jsonlines.org/) — JSONLines.org، 8 دقیقه
  - **بخوان:** Die drei Regeln: UTF-8, genau ein gültiger JSON-Wert pro Zeile und Zeilenabschluss.
  - **به‌کار ببر:** Serialisiere deterministisch und teste jede Zeile unabhängig als gültiges JSON.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Leite QuestionTypes aus den Use Cases ab <!-- w17-d1-t1-i1 -->
- [ ] Definiere erforderliche Evidenzfelder <!-- w17-d1-t1-i2 -->
- [ ] Schreibe die Refusal-Bedingung in den Contract <!-- w17-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.6.2, § 13.3, § 33.3, § 38.9 <!-- w17-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in QueryContracts aus <!-- w17-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w17-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: question-contract.schema.json <!-- w17-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w17-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w17-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-02-22 — Flat Retriever Freeze

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w17-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Retrieval.Flat |
| خروجی روز | `flat-config-v1.json` |
| منبع‌ها | [scikit-learn: Text Feature Extraction und TF-IDF](https://scikit-learn.org/stable/modules/feature_extraction.html)؛ [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782) |
| بخش‌های Exposé | 13.2, 29.3 |

**دلیل:** Die Baseline darf nach Sichtung der Testergebnisse nicht verändert werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Retrieval.Flat bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Dokumentiere Top-k und Tie-break
- **مدرک تحقیق:** `week-24-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Friere Tokenizer und Konfiguration ein <!-- w17-d2-t1-i1 -->
- [ ] Dokumentiere Top-k und Tie-break <!-- w17-d2-t1-i2 -->
- [ ] Fixiere das Ausgabeformat der Kandidaten <!-- w17-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 13.2, § 29.3 <!-- w17-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Retrieval.Flat aus <!-- w17-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w17-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: flat-config-v1.json <!-- w17-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w17-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w17-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-02-23 — Graph Query UC1 und UC2

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w17-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Retrieval.Graph |
| خروجی روز | `queries/uc1-uc2.cypher` |
| منبع‌ها | [Neo4j GraphAcademy: Cypher Fundamentals](https://graphacademy.neo4j.com/courses/cypher-fundamentals)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 26.1, 26.2, 38.9 |

**دلیل:** READ- und WRITE-Queries müssen vollständige Evidenzpfade liefern.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Retrieval.Graph bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Nimm SourceLocation in die Ausgabe auf
- **مدرک تحقیق:** `week-24-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [What is a graph database?](https://neo4j.com/docs/getting-started/graph-database/) — Neo4j Documentation، 15 دقیقه
  - **بخوان:** Nodes, relationships, properties, data model, indexes und constraints.
  - **به‌کار ببر:** Entscheide, was Entität, Beziehung oder Property ist, und begründe es mit einer Projektfrage.
- [Get started with Cypher](https://neo4j.com/docs/getting-started/cypher/intro-tutorial/) — Neo4j Documentation، 20 دقیقه
  - **بخوان:** Create the Movie Graph und die ersten MATCH-, CREATE- und MERGE-Beispiele.
  - **به‌کار ببر:** Übertrage das Muster auf Evidence-Nodes und gerichtete Beziehungen; teste Idempotenz mit MERGE.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Implementiere die Tabellenleser von UC1 <!-- w17-d3-t1-i1 -->
- [ ] Implementiere Mutationen und Persistence von UC2 <!-- w17-d3-t1-i2 -->
- [ ] Nimm SourceLocation in die Ausgabe auf <!-- w17-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 26.1, § 26.2, § 38.9 <!-- w17-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Retrieval.Graph aus <!-- w17-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w17-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: queries/uc1-uc2.cypher <!-- w17-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w17-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w17-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-02-24 — Graph Query UC3 und UC4

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w17-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Retrieval.Graph |
| خروجی روز | `queries/uc3-uc4.cypher` |
| منبع‌ها | [Neo4j GraphAcademy: Cypher Fundamentals](https://graphacademy.neo4j.com/courses/cypher-fundamentals)؛ [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view) |
| بخش‌های Exposé | 26.3, 26.4, 26.6 |

**دلیل:** Mechanismus und vollständiger Pfad werden für Architects erklärbar.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Retrieval.Graph bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Markiere Projektgrenzen
- **مدرک تحقیق:** `week-24-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [What is a graph database?](https://neo4j.com/docs/getting-started/graph-database/) — Neo4j Documentation، 15 دقیقه
  - **بخوان:** Nodes, relationships, properties, data model, indexes und constraints.
  - **به‌کار ببر:** Entscheide, was Entität, Beziehung oder Property ist, und begründe es mit einer Projektfrage.
- [Get started with Cypher](https://neo4j.com/docs/getting-started/cypher/intro-tutorial/) — Neo4j Documentation، 20 دقیقه
  - **بخوان:** Create the Movie Graph und die ersten MATCH-, CREATE- und MERGE-Beispiele.
  - **به‌کار ببر:** Übertrage das Muster auf Evidence-Nodes und gerichtete Beziehungen; teste Idempotenz mit MERGE.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Frage den Zugriffsmechanismus ab <!-- w17-d4-t1-i1 -->
- [ ] Gib den vollständigen Evidenzpfad zurück <!-- w17-d4-t1-i2 -->
- [ ] Markiere Projektgrenzen <!-- w17-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 26.3, § 26.4, § 26.6 <!-- w17-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Retrieval.Graph aus <!-- w17-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w17-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: queries/uc3-uc4.cypher <!-- w17-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w17-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w17-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-02-25 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w24-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-24-integration-evidence.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view)؛ [scikit-learn: Text Feature Extraction und TF-IDF](https://scikit-learn.org/stable/modules/feature_extraction.html)؛ [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782) |
| بخش‌های Exposé | 3.6.2, 13.3, 33.3, 38.9 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-24-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w24-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w24-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w24-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.6.2, § 13.3, § 33.3, § 38.9 <!-- capacity-w24-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w24-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w24-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-24-integration-evidence.md <!-- capacity-w24-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w24-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w24-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 25 — Flat vs. Graph und Query Contracts → Annotation, Pilot und Data Freeze

- **فاز:** Phase 4: Retrieval und Query / Phase 5: Goldstandard
- **هدف هفته:** Zwei Retrieval-Methoden werden auf derselben Evidenz und mit festen Fragen verglichen. Der Goldstandard wird mit klarer Einheit, Qualitätskontrolle und getrennten Pilot-/Testdaten vorbereitet.
- **خروجی الزامی هفته:** `week-25-integration-evidence.md` (روز `capacity-w25-integration`)
- **بازه:** 2027-02-26 تا 2027-03-04

### روز 1 — 2027-02-26 — Negative Control und Refusal

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w17-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Verifier |
| خروجی روز | `negative-controls.json` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) |
| بخش‌های Exposé | 26.5, 26.7, 14.3 |

**دلیل:** Ähnliche Namen dürfen keine unbelegte Antwort erzeugen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Verifier bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Implementiere fehlende Evidenz für UC5
- **مدرک تحقیق:** `week-25-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Implementiere fehlende Evidenz für UC5 <!-- w17-d5-t1-i1 -->
- [ ] Markiere Namensähnlichkeit in UC7 als negativ <!-- w17-d5-t1-i2 -->
- [ ] Gib einen NOT_ANSWERABLE-Reason-Code zurück <!-- w17-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 26.5, § 26.7, § 14.3 <!-- w17-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Verifier aus <!-- w17-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w17-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: negative-controls.json <!-- w17-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w17-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w17-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-03-01 — Fair Comparison Harness

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w17-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation |
| خروجی روز | `retrieval-harness.cs` |
| منبع‌ها | [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 13.2, 29.3, 38.11 |

**دلیل:** Flat und Graph müssen dieselben Fragen, dieselbe Evidenz und dasselbe Budget verwenden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Setze dasselbe Kandidatenbudget
- **مدرک تحقیق:** `week-25-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Fixiere das gemeinsame Input Set <!-- w17-d6-t1-i1 -->
- [ ] Setze dasselbe Kandidatenbudget <!-- w17-d6-t1-i2 -->
- [ ] Speichere Rohdaten unverändert <!-- w17-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 13.2, § 29.3, § 38.11 <!-- w17-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation aus <!-- w17-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w17-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: retrieval-harness.cs <!-- w17-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w17-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w17-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-03-02 — Annotationsleitfaden

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w18-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / Gold |
| خروجی روز | `annotation-guide-v1.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) |
| بخش‌های Exposé | 12.2, 12.3, 29.4 |

**دلیل:** Zwei Annotierende müssen dasselbe Evidenzelement gleich verstehen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation / Gold bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Definiere die Konfliktauflösung
- **مدرک تحقیق:** `week-25-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Configure a labeling interface](https://labelstud.io/guide/setup) — Label Studio Documentation، 15 دقیقه
  - **بخوان:** Set up the labeling interface und Example labeling config.
  - **به‌کار ببر:** Definiere Einheit, Labels, Positiv/Negativ-Beispiele und erlaubte Entscheidungen vor der Annotation.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere die Einheiten von RQ1 und RQ2 <!-- w18-d1-t1-i1 -->
- [ ] Gib Beispiele für Status- und Pfadregeln <!-- w18-d1-t1-i2 -->
- [ ] Definiere die Konfliktauflösung <!-- w18-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 12.2, § 12.3, § 29.4 <!-- w18-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / Gold aus <!-- w18-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w18-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: annotation-guide-v1.md <!-- w18-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w18-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w18-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-03-03 — Sampling Strategy

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w18-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / Gold |
| خروجی روز | `sampling-plan.csv` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource) |
| بخش‌های Exposé | 12.1, 18.3 |

**دلیل:** Die Stichprobe muss EF-Varianten und reale Schwierigkeiten abdecken.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation / Gold bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Lege die Hard-Negative-Quote fest
- **مدرک تحقیق:** `week-25-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Configure a labeling interface](https://labelstud.io/guide/setup) — Label Studio Documentation، 15 دقیقه
  - **بخوان:** Set up the labeling interface und Example labeling config.
  - **به‌کار ببر:** Definiere Einheit, Labels, Positiv/Negativ-Beispiele und erlaubte Entscheidungen vor der Annotation.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Bilde Strata nach Operation Type <!-- w18-d2-t1-i1 -->
- [ ] Prüfe die Vielfalt von Projekten und Dateien <!-- w18-d2-t1-i2 -->
- [ ] Lege die Hard-Negative-Quote fest <!-- w18-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 12.1, § 18.3 <!-- w18-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / Gold aus <!-- w18-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w18-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: sampling-plan.csv <!-- w18-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w18-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w18-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-03-04 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w25-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-25-integration-evidence.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252)؛ [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource) |
| بخش‌های Exposé | 26.5, 26.7, 14.3, 13.2 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-25-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w25-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w25-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w25-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 26.5, § 26.7, § 14.3, § 13.2 <!-- capacity-w25-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w25-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w25-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-25-integration-evidence.md <!-- capacity-w25-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w25-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w25-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 26 — Annotation, Pilot und Data Freeze

- **فاز:** Phase 5: Goldstandard
- **هدف هفته:** Der Goldstandard wird mit klarer Einheit, Qualitätskontrolle und getrennten Pilot-/Testdaten vorbereitet.
- **خروجی الزامی هفته:** `week-26-integration-evidence.md` (روز `capacity-w26-integration`)
- **بازه:** 2027-03-05 تا 2027-03-11

### روز 1 — 2027-03-05 — RQ1-Annotation

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w18-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / Gold |
| خروجی روز | `gold-rq1-pilot.jsonl` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view) |
| بخش‌های Exposé | 7.1, 14.1 |

**دلیل:** Method, OperationType, DatabaseTarget und Provenance müssen manuell bestätigt werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation / Gold bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Dokumentiere positive Labels
- **مدرک تحقیق:** `week-26-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Configure a labeling interface](https://labelstud.io/guide/setup) — Label Studio Documentation، 15 دقیقه
  - **بخوان:** Set up the labeling interface und Example labeling config.
  - **به‌کار ببر:** Definiere Einheit, Labels, Positiv/Negativ-Beispiele und erlaubte Entscheidungen vor der Annotation.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Dokumentiere positive Labels <!-- w18-d3-t1-i1 -->
- [ ] Bereite FP/FN-Reason-Codes vor <!-- w18-d3-t1-i2 -->
- [ ] Öffne und prüfe die zeilengenaue Provenance <!-- w18-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.1, § 14.1 <!-- w18-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / Gold aus <!-- w18-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w18-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: gold-rq1-pilot.jsonl <!-- w18-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w18-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w18-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-03-08 — RQ2-Fragensatz

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w18-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / Questions |
| خروجی روز | `questions-v1.jsonl` |
| منبع‌ها | [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 7.2, 13.3, 14.3 |

**دلیل:** Fragen müssen aus Rollen und Answerability Matrix stammen, nicht aus bereits gesehenen Modellantworten.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation / Questions bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Balanciere SUPPORTED, PARTIAL und NOT_ANSWERABLE
- **مدرک تحقیق:** `week-26-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Configure a labeling interface](https://labelstud.io/guide/setup) — Label Studio Documentation، 15 دقیقه
  - **بخوان:** Set up the labeling interface und Example labeling config.
  - **به‌کار ببر:** Definiere Einheit, Labels, Positiv/Negativ-Beispiele und erlaubte Entscheidungen vor der Annotation.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erstelle Fragen für jeden Use Case <!-- w18-d4-t1-i1 -->
- [ ] Balanciere SUPPORTED, PARTIAL und NOT_ANSWERABLE <!-- w18-d4-t1-i2 -->
- [ ] Speichere erforderliche Evidenz separat <!-- w18-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.2, § 13.3, § 14.3 <!-- w18-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / Questions aus <!-- w18-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w18-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: questions-v1.jsonl <!-- w18-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w18-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w18-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-03-09 — Zweitprüfung und Adjudikation

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w18-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / Gold |
| خروجی روز | `adjudication-log.csv` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 12.3, 18.5 |

**دلیل:** 15 bis 20 Prozent der Beispiele benötigen eine unabhängige Zweitprüfung.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation / Gold bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Bewahre das Adjudikationsprotokoll ohne Löschung von Konflikten
- **مدرک تحقیق:** `week-26-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Configure a labeling interface](https://labelstud.io/guide/setup) — Label Studio Documentation، 15 دقیقه
  - **بخوان:** Set up the labeling interface und Example labeling config.
  - **به‌کار ببر:** Definiere Einheit, Labels, Positiv/Negativ-Beispiele und erlaubte Entscheidungen vor der Annotation.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Fixiere die Stichprobe der Zweitprüfung <!-- w18-d5-t1-i1 -->
- [ ] Dokumentiere Übereinstimmung und Abweichung <!-- w18-d5-t1-i2 -->
- [ ] Bewahre das Adjudikationsprotokoll ohne Löschung von Konflikten <!-- w18-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 12.3, § 18.5 <!-- w18-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / Gold aus <!-- w18-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w18-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: adjudication-log.csv <!-- w18-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w18-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w18-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-03-10 — Pilot/Test Freeze

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w18-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / Data |
| خروجی روز | `dataset-manifest.json` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 29.1, 38.11 |

**دلیل:** Anpassung am Testset verursacht Leakage.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation / Data bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Formuliere das Änderungsverbot nach dem Freeze
- **مدرک تحقیق:** `week-26-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Configure a labeling interface](https://labelstud.io/guide/setup) — Label Studio Documentation، 15 دقیقه
  - **بخوان:** Set up the labeling interface und Example labeling config.
  - **به‌کار ببر:** Definiere Einheit, Labels, Positiv/Negativ-Beispiele und erlaubte Entscheidungen vor der Annotation.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Trenne Development, Pilot und Test <!-- w18-d6-t1-i1 -->
- [ ] Dokumentiere den Hash jedes Splits <!-- w18-d6-t1-i2 -->
- [ ] Formuliere das Änderungsverbot nach dem Freeze <!-- w18-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 29.1, § 38.11 <!-- w18-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / Data aus <!-- w18-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w18-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: dataset-manifest.json <!-- w18-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w18-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w18-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-03-11 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w26-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-26-integration-evidence.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view) |
| بخش‌های Exposé | 7.1, 14.1, 7.2, 13.3 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-26-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Configure a labeling interface](https://labelstud.io/guide/setup) — Label Studio Documentation، 15 دقیقه
  - **بخوان:** Set up the labeling interface und Example labeling config.
  - **به‌کار ببر:** Definiere Einheit, Labels, Positiv/Negativ-Beispiele und erlaubte Entscheidungen vor der Annotation.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w26-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w26-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w26-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.1, § 14.1, § 7.2, § 13.3 <!-- capacity-w26-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w26-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w26-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-26-integration-evidence.md <!-- capacity-w26-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w26-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w26-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 27 — Precision, Recall und F1 der Extraktion

- **فاز:** Phase 6: RQ1-Evaluation
- **هدف هفته:** Genauigkeit und Vollständigkeit des Extractors werden je Operationstyp gemessen.
- **خروجی الزامی هفته:** `week-27-integration-evidence.md` (روز `capacity-w27-integration`)
- **بازه:** 2027-03-12 تا 2027-03-18

### روز 1 — 2027-03-12 — Experimentkonfiguration RQ1

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w19-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation |
| خروجی روز | `rq1-config-v1.yaml` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 13.1, 14.1, 38.11 |

**دلیل:** Jeder Lauf benötigt eine eigene Konfiguration und Version.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Fixiere die Kategorien
- **مدرک تحقیق:** `week-27-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Fixiere die Kategorien <!-- w19-d1-t1-i1 -->
- [ ] Definiere Micro- und Macro-Aggregation <!-- w19-d1-t1-i2 -->
- [ ] Dokumentiere Tool- und Corpus-Hash <!-- w19-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 13.1, § 14.1, § 38.11 <!-- w19-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation aus <!-- w19-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w19-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: rq1-config-v1.yaml <!-- w19-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w19-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w19-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-03-15 — READ-Extraktion ausführen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w19-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation |
| خروجی روز | `runs/rq1-read/predictions.jsonl` |
| منبع‌ها | [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 7.1, 13.1 |

**دلیل:** Rohe READ-Vorhersagen müssen vor der Analyse gespeichert werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Halte die Vorhersagen unveränderlich
- **مدرک تحقیق:** `week-27-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Führe den Extractor auf dem Frozen Corpus aus <!-- w19-d2-t1-i1 -->
- [ ] Halte die Vorhersagen unveränderlich <!-- w19-d2-t1-i2 -->
- [ ] Dokumentiere Laufzeit und Warnungen <!-- w19-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.1, § 13.1 <!-- w19-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation aus <!-- w19-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w19-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: runs/rq1-read/predictions.jsonl <!-- w19-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w19-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w19-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-03-16 — WRITE-Extraktion ausführen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w19-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation |
| خروجی روز | `runs/rq1-write/predictions.jsonl` |
| منبع‌ها | [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 7.1, 28.2 |

**دلیل:** WRITE und Persistence werden getrennt und anschließend kombiniert gemessen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Dokumentiere die Anzahl ungelöster Mappings
- **مدرک تحقیق:** `week-27-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Führe Mutationen aus <!-- w19-d3-t1-i1 -->
- [ ] Führe Persistence-Links aus <!-- w19-d3-t1-i2 -->
- [ ] Dokumentiere die Anzahl ungelöster Mappings <!-- w19-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.1, § 28.2 <!-- w19-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation aus <!-- w19-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w19-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: runs/rq1-write/predictions.jsonl <!-- w19-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w19-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w19-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-03-17 — Precision/Recall/F1 berechnen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w19-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / Metrics |
| خروجی روز | `rq1-metrics.json` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 3.5.8 bis 3.5.13, 14.1 |

**دلیل:** Ergebnisse müssen je Kategorie und aggregiert vorliegen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation / Metrics bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Berichte Micro und Macro getrennt
- **مدرک تحقیق:** `week-27-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Ermittle TP, FP und FN <!-- w19-d4-t1-i1 -->
- [ ] Berechne Precision, Recall und F1 je Kategorie <!-- w19-d4-t1-i2 -->
- [ ] Berichte Micro und Macro getrennt <!-- w19-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.5.8 bis 3.5.13, § 14.1 <!-- w19-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / Metrics aus <!-- w19-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w19-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: rq1-metrics.json <!-- w19-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w19-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w19-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-03-18 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w27-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-27-integration-evidence.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource) |
| بخش‌های Exposé | 13.1, 14.1, 38.11, 7.1 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-27-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w27-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w27-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w27-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 13.1, § 14.1, § 38.11, § 7.1 <!-- capacity-w27-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w27-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w27-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-27-integration-evidence.md <!-- capacity-w27-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w27-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w27-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 28 — Precision, Recall und F1 der Extraktion → Flat vs. Graph und Verifier-Ablation

- **فاز:** Phase 6: RQ1-Evaluation / Phase 6: RQ2-Evaluation
- **هدف هفته:** Genauigkeit und Vollständigkeit des Extractors werden je Operationstyp gemessen. Antwortqualität, Evidenz, Pfad und Refusal werden in zwei kontrollierten Experimenten gemessen.
- **خروجی الزامی هفته:** `week-28-integration-evidence.md` (روز `capacity-w28-integration`)
- **بازه:** 2027-03-19 تا 2027-03-25

### روز 1 — 2027-03-19 — RQ1-Fehleranalyse

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w19-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / Errors |
| خروجی روز | `rq1-errors.csv` |
| منبع‌ها | [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view)؛ [Alshemaimri et al. 2021: Database Code Fragments Survey](https://onlinelibrary.wiley.com/doi/full/10.1002/eng2.12441) |
| بخش‌های Exposé | 15, 18 |

**دلیل:** Eine Zahl ohne Fehlerursache liefert keine Anleitung zur Verbesserung.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation / Errors bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Klassifiziere False Positives
- **مدرک تحقیق:** `week-28-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Klassifiziere False Positives <!-- w19-d5-t1-i1 -->
- [ ] Klassifiziere False Negatives <!-- w19-d5-t1-i2 -->
- [ ] Trenne Mapping-, Resolution- und Scope-Fehler <!-- w19-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 15, § 18 <!-- w19-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / Errors aus <!-- w19-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w19-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: rq1-errors.csv <!-- w19-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w19-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w19-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-03-22 — RQ1 Freeze und Interpretation

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w19-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Reports |
| خروجی روز | `rq1-result-note.md` |
| منبع‌ها | [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 16, 17, 18 |

**دلیل:** Eine Regeländerung nach dem Test muss eine neue Experimentversion erzeugen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Reports bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Dokumentiere Corpus-Grenzen
- **مدرک تحقیق:** `week-28-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Beantworte RQ1 mit den Ergebnissen <!-- w19-d6-t1-i1 -->
- [ ] Dokumentiere Corpus-Grenzen <!-- w19-d6-t1-i2 -->
- [ ] Vermeide überzogene Generalisierung <!-- w19-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 16, § 17, § 18 <!-- w19-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Reports aus <!-- w19-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w19-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: rq1-result-note.md <!-- w19-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w19-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w19-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-03-23 — Vertrag für Experiment A

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w20-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation |
| خروجی روز | `experiment-a.yaml` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782) |
| بخش‌های Exposé | 13.2, 29.3 |

**دلیل:** Flat und Graph werden mit derselben Evidenz und denselben Regeln verglichen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Halte den Repräsentationsunterschied als einzige Variable
- **مدرک تحقیق:** `week-28-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere gemeinsame Fragen <!-- w20-d1-t1-i1 -->
- [ ] Gleiche das Retrieval-Budget an <!-- w20-d1-t1-i2 -->
- [ ] Halte den Repräsentationsunterschied als einzige Variable <!-- w20-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 13.2, § 29.3 <!-- w20-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation aus <!-- w20-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w20-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: experiment-a.yaml <!-- w20-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w20-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w20-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-03-24 — Flat Retrieval ausführen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w20-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation |
| خروجی روز | `runs/rq2-flat/results.jsonl` |
| منبع‌ها | [scikit-learn: Text Feature Extraction und TF-IDF](https://scikit-learn.org/stable/modules/feature_extraction.html)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 7.2, 14.2 |

**دلیل:** Die rohe Baseline muss ohne Graph-Unterstützung laufen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Dokumentiere Latenz und Coverage
- **مدرک تحقیق:** `week-28-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Führe alle Fragen aus <!-- w20-d2-t1-i1 -->
- [ ] Speichere Top-k-Kandidaten <!-- w20-d2-t1-i2 -->
- [ ] Dokumentiere Latenz und Coverage <!-- w20-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.2, § 14.2 <!-- w20-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation aus <!-- w20-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w20-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: runs/rq2-flat/results.jsonl <!-- w20-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w20-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w20-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-03-25 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w28-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-28-integration-evidence.md` |
| منبع‌ها | [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view)؛ [Alshemaimri et al. 2021: Database Code Fragments Survey](https://onlinelibrary.wiley.com/doi/full/10.1002/eng2.12441)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 15, 18, 16, 17 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-28-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w28-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w28-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w28-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 15, § 18, § 16, § 17 <!-- capacity-w28-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w28-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w28-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-28-integration-evidence.md <!-- capacity-w28-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w28-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w28-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 29 — Flat vs. Graph und Verifier-Ablation

- **فاز:** Phase 6: RQ2-Evaluation
- **هدف هفته:** Antwortqualität, Evidenz, Pfad und Refusal werden in zwei kontrollierten Experimenten gemessen.
- **خروجی الزامی هفته:** `week-29-integration-evidence.md` (روز `capacity-w29-integration`)
- **بازه:** 2027-03-26 تا 2027-04-01

### روز 1 — 2027-03-26 — Graph Retrieval ausführen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w20-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation |
| خروجی روز | `runs/rq2-graph/results.jsonl` |
| منبع‌ها | [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782)؛ [Neo4j GraphAcademy: Cypher Fundamentals](https://graphacademy.neo4j.com/courses/cypher-fundamentals) |
| بخش‌های Exposé | 7.2, 14.2 |

**دلیل:** Der Graph muss Pfad und Evidenzelement zurückgeben.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Führe dieselben Fragen aus
- **مدرک تحقیق:** `week-29-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Führe dieselben Fragen aus <!-- w20-d3-t1-i1 -->
- [ ] Speichere zurückgegebene Pfade <!-- w20-d3-t1-i2 -->
- [ ] Dokumentiere Latenz und fehlende Pfade <!-- w20-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.2, § 14.2 <!-- w20-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation aus <!-- w20-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w20-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: runs/rq2-graph/results.jsonl <!-- w20-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w20-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w20-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-03-29 — Experiment B: Verifier-Ablation

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w20-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / Verifier |
| خروجی روز | `experiment-b-results.json` |
| منبع‌ها | [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 3.6, 14.3, 29.3 |

**دلیل:** Der Verifier-Effekt muss getrennt vom Graph-Effekt gemessen werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation / Verifier bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Führe Graph mit Verifier aus
- **مدرک تحقیق:** `week-29-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Führe Graph ohne Verifier aus <!-- w20-d4-t1-i1 -->
- [ ] Führe Graph mit Verifier aus <!-- w20-d4-t1-i2 -->
- [ ] Vergleiche unbelegte Antworten und Refusals <!-- w20-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.6, § 14.3, § 29.3 <!-- w20-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / Verifier aus <!-- w20-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w20-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: experiment-b-results.json <!-- w20-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w20-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w20-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-03-30 — RQ2-Metriken

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w20-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Evaluation / Metrics |
| خروجی روز | `rq2-metrics.json` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) |
| بخش‌های Exposé | 14.2, 14.3 |

**دلیل:** Die Primärmetriken sind Answer Correctness, Evidence Completeness, Path Validity und Correct Refusal.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation / Metrics bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Bewahre die Granularität von Frage, Evidenz und Pfad
- **مدرک تحقیق:** `week-29-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.
- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Berechne alle vier Primärmetriken <!-- w20-d5-t1-i1 -->
- [ ] Halte sekundäre Metriken getrennt <!-- w20-d5-t1-i2 -->
- [ ] Bewahre die Granularität von Frage, Evidenz und Pfad <!-- w20-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 14.2, § 14.3 <!-- w20-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / Metrics aus <!-- w20-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w20-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: rq2-metrics.json <!-- w20-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w20-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w20-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-03-31 — RQ2-Fehleranalyse

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w20-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Reports |
| خروجی روز | `rq2-errors-and-cases.md` |
| منبع‌ها | [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 15, 18 |

**دلیل:** Jeder Fehler muss Retrieval, Pfad, Verifier oder Answering zugeordnet werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Reports bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Schreibe drei vollständige Fallstudien
- **مدرک تحقیق:** `week-29-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Kennzeichne die Fehlerstufe <!-- w20-d6-t1-i1 -->
- [ ] Trenne False Refusal und unbelegte Antwort <!-- w20-d6-t1-i2 -->
- [ ] Schreibe drei vollständige Fallstudien <!-- w20-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 15, § 18 <!-- w20-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Reports aus <!-- w20-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w20-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: rq2-errors-and-cases.md <!-- w20-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w20-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w20-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-04-01 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w29-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-29-integration-evidence.md` |
| منبع‌ها | [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782)؛ [Neo4j GraphAcademy: Cypher Fundamentals](https://graphacademy.neo4j.com/courses/cypher-fundamentals)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 7.2, 14.2, 3.6, 14.3 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-29-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html) — Stanford IR Book، 20 دقیقه
  - **بخوان:** Test collection, relevance judgments, precision/recall und ranked retrieval evaluation.
  - **به‌کار ببر:** Fixiere Corpus, Fragen und Relevanzurteile, bevor du Systeme oder Metriken vergleichst.
- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w29-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w29-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w29-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7.2, § 14.2, § 3.6, § 14.3 <!-- capacity-w29-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w29-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w29-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-29-integration-evidence.md <!-- capacity-w29-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w29-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w29-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 30 — Verlässliche Ausgabe für Developer, Architect und QA

- **فاز:** Phase 7: Answerability und Rollen
- **هدف هفته:** Jede Rolle erhält nur belegte Claims, Evidenzpfade und passende Einschränkungen.
- **خروجی الزامی هفته:** `week-30-integration-evidence.md` (روز `capacity-w30-integration`)
- **بازه:** 2027-04-02 تا 2027-04-08

### روز 1 — 2027-04-02 — Answerability Matrix

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w21-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Verifier |
| خروجی روز | `answerability-matrix.yaml` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) |
| بخش‌های Exposé | 3.6, 14.3 |

**دلیل:** Das System muss vor der Antwort entscheiden, ob die Evidenz ausreicht.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Verifier bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Operationalisiere SUPPORTED
- **مدرک تحقیق:** `week-30-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Retrieval augmented generation and indexes](https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation) — Microsoft Learn، 18 دقیقه
  - **بخوان:** What is RAG?, Retrieve–Augment–Generate und Limitations and troubleshooting.
  - **به‌کار ببر:** Trenne Retrieval, Grounding, Generation, Citation und Verhalten bei unzureichender Evidenz.
- [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — OWASP GenAI Security Project، 15 دقیقه
  - **بخوان:** Description, attack scenarios und prevention/mitigation; beachte, dass RAG Prompt Injection nicht beseitigt.
  - **به‌کار ببر:** Behandle Dokumentinhalt als nicht vertrauenswürdige Daten und teste einen Refusal- oder Guardrail-Fall.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Operationalisiere SUPPORTED <!-- w21-d1-t1-i1 -->
- [ ] Operationalisiere PARTIALLY_SUPPORTED <!-- w21-d1-t1-i2 -->
- [ ] Fixiere NOT_ANSWERABLE-Gründe <!-- w21-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.6, § 14.3 <!-- w21-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Verifier aus <!-- w21-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w21-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: answerability-matrix.yaml <!-- w21-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w21-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w21-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-04-05 — Developer Output

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w21-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Answering / Developer |
| خروجی روز | `developer-output.schema.json` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view) |
| بخش‌های Exposé | 1.6, 25.2, 26.1 bis 26.2 |

**دلیل:** Developer benötigen Method, File, Line und direkte Evidenz.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Answering / Developer bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Zeige direkte Source Locations
- **مدرک تحقیق:** `week-30-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Personas: Study Guide](https://www.nngroup.com/articles/personas-study-guide/) — Nielsen Norman Group، 15 دقیقه
  - **بخوان:** What Is a Persona? sowie die ersten Hinweise unter How to Create Personas.
  - **به‌کار ببر:** Beschreibe Developer, Architect und QA anhand von Ziel, Entscheidung, Kontext und Informationsbedarf statt nur anhand ihrer Jobtitel.
- [Learning about users and their needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) — GOV.UK Service Manual، 15 دقیقه
  - **بخوان:** Understanding user needs, Writing user needs und Linking user needs to user stories.
  - **به‌کار ببر:** Schreibe jeden Bedarf als Ziel und Nutzen; behandle unbelegte Annahmen ausdrücklich als Annahmen.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere einen kurzen Claim <!-- w21-d2-t1-i1 -->
- [ ] Zeige direkte Source Locations <!-- w21-d2-t1-i2 -->
- [ ] Verberge ungelöstes Mapping nicht <!-- w21-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 1.6, § 25.2, § 26.1 bis 26.2 <!-- w21-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Answering / Developer aus <!-- w21-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w21-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: developer-output.schema.json <!-- w21-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w21-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w21-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-04-06 — Architect Output

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w21-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Answering / Architect |
| خروجی روز | `architect-output.schema.json` |
| منبع‌ها | [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 1.6, 26.4, 26.6 |

**دلیل:** Architects benötigen Pfad, Boundary und Mapping.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Answering / Architect bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Trenne direkte und abgeleitete Evidenz
- **مدرک تحقیق:** `week-30-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Personas: Study Guide](https://www.nngroup.com/articles/personas-study-guide/) — Nielsen Norman Group، 15 دقیقه
  - **بخوان:** What Is a Persona? sowie die ersten Hinweise unter How to Create Personas.
  - **به‌کار ببر:** Beschreibe Developer, Architect und QA anhand von Ziel, Entscheidung, Kontext und Informationsbedarf statt nur anhand ihrer Jobtitel.
- [Learning about users and their needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) — GOV.UK Service Manual، 15 دقیقه
  - **بخوان:** Understanding user needs, Writing user needs und Linking user needs to user stories.
  - **به‌کار ببر:** Schreibe jeden Bedarf als Ziel und Nutzen; behandle unbelegte Annahmen ausdrücklich als Annahmen.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Zeige den Call Path <!-- w21-d3-t1-i1 -->
- [ ] Markiere Projekt- und Repository-Grenzen <!-- w21-d3-t1-i2 -->
- [ ] Trenne direkte und abgeleitete Evidenz <!-- w21-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 1.6, § 26.4, § 26.6 <!-- w21-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Answering / Architect aus <!-- w21-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w21-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: architect-output.schema.json <!-- w21-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w21-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w21-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-04-07 — QA/Compliance Output

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w21-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Answering / QA |
| خروجی روز | `qa-output.schema.json` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view) |
| بخش‌های Exposé | 1.5, 1.6, 26.5 |

**دلیل:** QA benötigt Inventar, Coverage und Evidence Gaps.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Answering / QA bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verbinde jeden Claim mit einer SourceLocation
- **مدرک تحقیق:** `week-30-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Personas: Study Guide](https://www.nngroup.com/articles/personas-study-guide/) — Nielsen Norman Group، 15 دقیقه
  - **بخوان:** What Is a Persona? sowie die ersten Hinweise unter How to Create Personas.
  - **به‌کار ببر:** Beschreibe Developer, Architect und QA anhand von Ziel, Entscheidung, Kontext und Informationsbedarf statt nur anhand ihrer Jobtitel.
- [Learning about users and their needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) — GOV.UK Service Manual، 15 دقیقه
  - **بخوان:** Understanding user needs, Writing user needs und Linking user needs to user stories.
  - **به‌کار ببر:** Schreibe jeden Bedarf als Ziel und Nutzen; behandle unbelegte Annahmen ausdrücklich als Annahmen.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Definiere das READ/WRITE-Inventar <!-- w21-d4-t1-i1 -->
- [ ] Zeige Coverage und Unresolved Counts <!-- w21-d4-t1-i2 -->
- [ ] Verbinde jeden Claim mit einer SourceLocation <!-- w21-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 1.5, § 1.6, § 26.5 <!-- w21-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Answering / QA aus <!-- w21-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w21-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: qa-output.schema.json <!-- w21-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w21-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w21-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-04-08 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w30-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-30-integration-evidence.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view)؛ [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view) |
| بخش‌های Exposé | 3.6, 14.3, 1.6, 25.2 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-30-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Retrieval augmented generation and indexes](https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation) — Microsoft Learn، 18 دقیقه
  - **بخوان:** What is RAG?, Retrieve–Augment–Generate und Limitations and troubleshooting.
  - **به‌کار ببر:** Trenne Retrieval, Grounding, Generation, Citation und Verhalten bei unzureichender Evidenz.
- [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — OWASP GenAI Security Project، 15 دقیقه
  - **بخوان:** Description, attack scenarios und prevention/mitigation; beachte, dass RAG Prompt Injection nicht beseitigt.
  - **به‌کار ببر:** Behandle Dokumentinhalt als nicht vertrauenswürdige Daten und teste einen Refusal- oder Guardrail-Fall.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w30-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w30-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w30-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 3.6, § 14.3, § 1.6, § 25.2 <!-- capacity-w30-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w30-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w30-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-30-integration-evidence.md <!-- capacity-w30-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w30-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w30-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 31 — Verlässliche Ausgabe für Developer, Architect und QA → Fehlertaxonomie und Threats to Validity

- **فاز:** Phase 7: Answerability und Rollen / Phase 8: Fehler und Validität
- **هدف هفته:** Jede Rolle erhält nur belegte Claims, Evidenzpfade und passende Einschränkungen. Grenzen, Fehler und Generalisierbarkeit werden wissenschaftlich und vertretbar dokumentiert.
- **خروجی الزامی هفته:** `week-31-integration-evidence.md` (روز `capacity-w31-integration`)
- **بازه:** 2027-04-09 تا 2027-04-15

### روز 1 — 2027-04-09 — LLM Output Guardrail

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w21-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Answering / Guardrails |
| خروجی روز | `answer-validator.cs` |
| منبع‌ها | [Radford et al. 2019: Language Models are Unsupervised Multitask Learners](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 38.9, 27.1 |

**دلیل:** Das LLM darf Text glätten, aber Claims und Evidenz nicht verändern.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Answering / Guardrails bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Mache strukturierte Claims unveränderlich
- **مدرک تحقیق:** `week-31-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Retrieval augmented generation and indexes](https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation) — Microsoft Learn، 18 دقیقه
  - **بخوان:** What is RAG?, Retrieve–Augment–Generate und Limitations and troubleshooting.
  - **به‌کار ببر:** Trenne Retrieval, Grounding, Generation, Citation und Verhalten bei unzureichender Evidenz.
- [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — OWASP GenAI Security Project، 15 دقیقه
  - **بخوان:** Description, attack scenarios und prevention/mitigation; beachte, dass RAG Prompt Injection nicht beseitigt.
  - **به‌کار ببر:** Behandle Dokumentinhalt als nicht vertrauenswürdige Daten und teste einen Refusal- oder Guardrail-Fall.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Mache strukturierte Claims unveränderlich <!-- w21-d5-t1-i1 -->
- [ ] Füge eine Citation-Coverage-Prüfung hinzu <!-- w21-d5-t1-i2 -->
- [ ] Verwerfe unbelegte Sätze <!-- w21-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 38.9, § 27.1 <!-- w21-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Answering / Guardrails aus <!-- w21-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w21-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: answer-validator.cs <!-- w21-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w21-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w21-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-04-12 — Rollen-Akzeptanztests

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w21-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Tests / Answering |
| خروجی روز | `role-acceptance-report.md` |
| منبع‌ها | [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 17, 26 |

**دلیل:** Jede Persona muss mit festen Fragen und Erwartungen getestet werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Tests / Answering bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Validiere das Ausgabeschema
- **مدرک تحقیق:** `week-31-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Retrieval augmented generation and indexes](https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation) — Microsoft Learn، 18 دقیقه
  - **بخوان:** What is RAG?, Retrieve–Augment–Generate und Limitations and troubleshooting.
  - **به‌کار ببر:** Trenne Retrieval, Grounding, Generation, Citation und Verhalten bei unzureichender Evidenz.
- [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — OWASP GenAI Security Project، 15 دقیقه
  - **بخوان:** Description, attack scenarios und prevention/mitigation; beachte, dass RAG Prompt Injection nicht beseitigt.
  - **به‌کار ببر:** Behandle Dokumentinhalt als nicht vertrauenswürdige Daten und teste einen Refusal- oder Guardrail-Fall.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Führe drei Fragen pro Rolle aus <!-- w21-d6-t1-i1 -->
- [ ] Validiere das Ausgabeschema <!-- w21-d6-t1-i2 -->
- [ ] Prüfe das Refusal-Verhalten manuell <!-- w21-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 17, § 26 <!-- w21-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Tests / Answering aus <!-- w21-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w21-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: role-acceptance-report.md <!-- w21-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w21-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w21-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-04-13 — Fehlertaxonomie der Extraktion

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w22-d1` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Reports / Errors |
| خروجی روز | `extraction-error-taxonomy.csv` |
| منبع‌ها | [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 15, 18.1 bis 18.2 |

**دلیل:** Syntax-, Symbol-, Mapping- und Persistence-Fehler müssen trennbar sein.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Reports / Errors bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Wähle für jede Kategorie ein reales Beispiel
- **مدرک تحقیق:** `week-31-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [The Methodology](https://libguides.usc.edu/writingguide/methodology) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Methodology Section und Structure and Writing Style.
  - **به‌کار ببر:** Beschreibe Auswahl, Werkzeug, Ablauf, Messung und Begründung so, dass der Versuch wiederholbar ist.
- [Conducting Research](https://owl.purdue.edu/owl/research_and_citation/conducting_research/index.html) — Purdue Online Writing Lab، 15 دقیقه
  - **بخوان:** Starting the Research Process und Choosing a Topic; nutze nur die Schritte von Problem zu fokussierbarer Frage.
  - **به‌کار ببر:** Formuliere Problem, Ziel und geplanten Beleg getrennt, bevor du das Tagesartefakt beginnst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erstelle eine Taxonomie auf Komponentenebene <!-- w22-d1-t1-i1 -->
- [ ] Dokumentiere Schweregrad und Behebbarkeit <!-- w22-d1-t1-i2 -->
- [ ] Wähle für jede Kategorie ein reales Beispiel <!-- w22-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 15, § 18.1 bis 18.2 <!-- w22-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Reports / Errors aus <!-- w22-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w22-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: extraction-error-taxonomy.csv <!-- w22-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w22-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w22-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-04-14 — Fehlertaxonomie des Retrievals

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w22-d2` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Reports / Errors |
| خروجی روز | `retrieval-error-taxonomy.csv` |
| منبع‌ها | [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view) |
| بخش‌های Exposé | 15, 18.1 |

**دلیل:** Candidate Miss, Path Miss und Ranking Error haben unterschiedliche Ursachen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Reports / Errors bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Kennzeichne mehrdeutige Fragen
- **مدرک تحقیق:** `week-31-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [The Methodology](https://libguides.usc.edu/writingguide/methodology) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Methodology Section und Structure and Writing Style.
  - **به‌کار ببر:** Beschreibe Auswahl, Werkzeug, Ablauf, Messung und Begründung so, dass der Versuch wiederholbar ist.
- [Conducting Research](https://owl.purdue.edu/owl/research_and_citation/conducting_research/index.html) — Purdue Online Writing Lab، 15 دقیقه
  - **بخوان:** Starting the Research Process und Choosing a Topic; nutze nur die Schritte von Problem zu fokussierbarer Frage.
  - **به‌کار ببر:** Formuliere Problem, Ziel und geplanten Beleg getrennt, bevor du das Tagesartefakt beginnst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Trenne die Fehlerstufen <!-- w22-d2-t1-i1 -->
- [ ] Vergleiche flat-only und graph-only <!-- w22-d2-t1-i2 -->
- [ ] Kennzeichne mehrdeutige Fragen <!-- w22-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 15, § 18.1 <!-- w22-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Reports / Errors aus <!-- w22-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w22-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: retrieval-error-taxonomy.csv <!-- w22-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w22-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w22-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-04-15 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w31-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-31-integration-evidence.md` |
| منبع‌ها | [Radford et al. 2019: Language Models are Unsupervised Multitask Learners](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)؛ [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view)؛ [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view) |
| بخش‌های Exposé | 38.9, 27.1, 17, 26 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-31-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Retrieval augmented generation and indexes](https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation) — Microsoft Learn، 18 دقیقه
  - **بخوان:** What is RAG?, Retrieve–Augment–Generate und Limitations and troubleshooting.
  - **به‌کار ببر:** Trenne Retrieval, Grounding, Generation, Citation und Verhalten bei unzureichender Evidenz.
- [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — OWASP GenAI Security Project، 15 دقیقه
  - **بخوان:** Description, attack scenarios und prevention/mitigation; beachte, dass RAG Prompt Injection nicht beseitigt.
  - **به‌کار ببر:** Behandle Dokumentinhalt als nicht vertrauenswürdige Daten und teste einen Refusal- oder Guardrail-Fall.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w31-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w31-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w31-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 38.9, § 27.1, § 17, § 26 <!-- capacity-w31-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w31-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w31-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-31-integration-evidence.md <!-- capacity-w31-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w31-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w31-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 32 — Fehlertaxonomie und Threats to Validity

- **فاز:** Phase 8: Fehler und Validität
- **هدف هفته:** Grenzen, Fehler und Generalisierbarkeit werden wissenschaftlich und vertretbar dokumentiert.
- **خروجی الزامی هفته:** `week-32-integration-evidence.md` (روز `capacity-w32-integration`)
- **بازه:** 2027-04-16 تا 2027-04-22

### روز 1 — 2027-04-16 — Konstrukt- und interne Validität

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w22-d3` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Reports / Validity |
| خروجی روز | `validity-internal.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view) |
| بخش‌های Exposé | 18.1, 18.2 |

**دلیل:** Die Metriken müssen tatsächlich das behauptete Konzept messen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Reports / Validity bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Erstelle eine Construct-to-metric Map
- **مدرک تحقیق:** `week-32-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [The Methodology](https://libguides.usc.edu/writingguide/methodology) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Methodology Section und Structure and Writing Style.
  - **به‌کار ببر:** Beschreibe Auswahl, Werkzeug, Ablauf, Messung und Begründung so, dass der Versuch wiederholbar ist.
- [Conducting Research](https://owl.purdue.edu/owl/research_and_citation/conducting_research/index.html) — Purdue Online Writing Lab، 15 دقیقه
  - **بخوان:** Starting the Research Process und Choosing a Topic; nutze nur die Schritte von Problem zu fokussierbarer Frage.
  - **به‌کار ببر:** Formuliere Problem, Ziel und geplanten Beleg getrennt, bevor du das Tagesartefakt beginnst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erstelle eine Construct-to-metric Map <!-- w22-d3-t1-i1 -->
- [ ] Dokumentiere Leakage- und Tuning-Risiken <!-- w22-d3-t1-i2 -->
- [ ] Prüfe Confounder der Experimente A und B <!-- w22-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 18.1, § 18.2 <!-- w22-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Reports / Validity aus <!-- w22-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w22-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: validity-internal.md <!-- w22-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w22-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w22-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-04-19 — Externe und Schlussfolgerungsvalidität

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w22-d4` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Reports / Validity |
| خروجی روز | `validity-external.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource) |
| بخش‌های Exposé | 18.3, 18.4 |

**دلیل:** Ein Corpus reicht nicht für allgemeine Aussagen über alle C#-Projekte.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Reports / Validity bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Begrenze die Generalisierung auf EF Core
- **مدرک تحقیق:** `week-32-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [The Methodology](https://libguides.usc.edu/writingguide/methodology) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Methodology Section und Structure and Writing Style.
  - **به‌کار ببر:** Beschreibe Auswahl, Werkzeug, Ablauf, Messung und Begründung so, dass der Versuch wiederholbar ist.
- [Conducting Research](https://owl.purdue.edu/owl/research_and_citation/conducting_research/index.html) — Purdue Online Writing Lab، 15 دقیقه
  - **بخوان:** Starting the Research Process und Choosing a Topic; nutze nur die Schritte von Problem zu fokussierbarer Frage.
  - **به‌کار ببر:** Formuliere Problem, Ziel und geplanten Beleg getrennt, bevor du das Tagesartefakt beginnst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Dokumentiere Danphe-spezifischen Bias <!-- w22-d4-t1-i1 -->
- [ ] Begrenze die Generalisierung auf EF Core <!-- w22-d4-t1-i2 -->
- [ ] Berichte statistische Unsicherheit <!-- w22-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 18.3, § 18.4 <!-- w22-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Reports / Validity aus <!-- w22-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w22-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: validity-external.md <!-- w22-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w22-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w22-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-04-20 — Researcher Bias und Ethik

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w22-d5` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Reports / Ethics |
| خروجی روز | `ethics-and-bias.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 18.5, 19 |

**دلیل:** Annotation und Gesundheitsdomäne erfordern Bias-Kontrolle und Lizenzkonformität.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Reports / Ethics bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Stelle klar, dass keine Patientendaten verwendet werden
- **مدرک تحقیق:** `week-32-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [The Methodology](https://libguides.usc.edu/writingguide/methodology) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Methodology Section und Structure and Writing Style.
  - **به‌کار ببر:** Beschreibe Auswahl, Werkzeug, Ablauf, Messung und Begründung so, dass der Versuch wiederholbar ist.
- [Conducting Research](https://owl.purdue.edu/owl/research_and_citation/conducting_research/index.html) — Purdue Online Writing Lab، 15 دقیقه
  - **بخوان:** Starting the Research Process und Choosing a Topic; nutze nur die Schritte von Problem zu fokussierbarer Frage.
  - **به‌کار ببر:** Formuliere Problem, Ziel und geplanten Beleg getrennt, bevor du das Tagesartefakt beginnst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Liste manuelle Entscheidungen auf <!-- w22-d5-t1-i1 -->
- [ ] Verlinke Evidenz der Zweitprüfung <!-- w22-d5-t1-i2 -->
- [ ] Stelle klar, dass keine Patientendaten verwendet werden <!-- w22-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 18.5, § 19 <!-- w22-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Reports / Ethics aus <!-- w22-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w22-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: ethics-and-bias.md <!-- w22-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w22-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w22-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-04-21 — Validity Review Gate

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w22-d6` |
| حالت کار | Screen |
| نوع | project |
| ماژول | Reports |
| خروجی روز | `validity-review-checklist.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 18, 22, 32 |

**دلیل:** Jeder Ergebnis-Claim benötigt eine entsprechende Einschränkung.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Reports bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Bereite schwierige Fragen der Betreuung vor
- **مدرک تحقیق:** `week-32-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Acceptance criteria: definition, examples and tips](https://www.atlassian.com/work-management/project-management/acceptance-criteria) — Atlassian، 12 دقیقه
  - **بخوان:** Acceptance criteria vs. user story und die Beispiele für klare, messbare Bedingungen.
  - **به‌کار ببر:** Formuliere Erfolg als beobachtbare Bedingung; vermeide Formulierungen wie ‚funktioniert gut‘.
- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Verbinde jeden Ergebnis-Claim mit einem Threat <!-- w22-d6-t1-i1 -->
- [ ] Entferne überzogene Formulierungen <!-- w22-d6-t1-i2 -->
- [ ] Bereite schwierige Fragen der Betreuung vor <!-- w22-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 18, § 22, § 32 <!-- w22-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Reports aus <!-- w22-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w22-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: validity-review-checklist.md <!-- w22-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w22-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w22-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-04-22 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w32-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-32-integration-evidence.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource) |
| بخش‌های Exposé | 18.1, 18.2, 18.3, 18.4 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-32-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [The Methodology](https://libguides.usc.edu/writingguide/methodology) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Methodology Section und Structure and Writing Style.
  - **به‌کار ببر:** Beschreibe Auswahl, Werkzeug, Ablauf, Messung und Begründung so, dass der Versuch wiederholbar ist.
- [Conducting Research](https://owl.purdue.edu/owl/research_and_citation/conducting_research/index.html) — Purdue Online Writing Lab، 15 دقیقه
  - **بخوان:** Starting the Research Process und Choosing a Topic; nutze nur die Schritte von Problem zu fokussierbarer Frage.
  - **به‌کار ببر:** Formuliere Problem, Ziel und geplanten Beleg getrennt, bevor du das Tagesartefakt beginnst.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w32-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w32-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w32-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 18.1, § 18.2, § 18.3, § 18.4 <!-- capacity-w32-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w32-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w32-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-32-integration-evidence.md <!-- capacity-w32-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w32-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w32-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 33 — Thesis Draft, Reproduktion und Demo

- **فاز:** Phase 9: Schreiben und Abgabe
- **هدف هفته:** Artefakt und Ergebnisse werden zu einem reproduzierbaren, mündlich erklärbaren Paket.
- **خروجی الزامی هفته:** `week-33-integration-evidence.md` (روز `capacity-w33-integration`)
- **بازه:** 2027-04-23 تا 2027-04-29

### روز 1 — 2027-04-23 — Entwurf des Methodenkapitels

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w23-d1` |
| حالت کار | Screen |
| نوع | writing |
| ماژول | Thesis / Method |
| خروجی روز | `method-draft.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view) |
| بخش‌های Exposé | 11 bis 13, 21 |

**دلیل:** Die Methode muss Corpus, Extractor, Goldstandard und Experiment reproduzierbar erklären.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Thesis / Method bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Beschreibe Ein- und Ausgabe jeder Stufe
- **مدرک تحقیق:** `week-33-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [The Methodology](https://libguides.usc.edu/writingguide/methodology) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Methodology Section und Structure and Writing Style.
  - **به‌کار ببر:** Beschreibe Auswahl, Werkzeug, Ablauf, Messung und Begründung so, dass der Versuch wiederholbar ist.
- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Beschreibe Ein- und Ausgabe jeder Stufe <!-- w23-d1-t1-i1 -->
- [ ] Dokumentiere Stop-Regeln und Unsicherheit <!-- w23-d1-t1-i2 -->
- [ ] Versioniere die Konfigurationen <!-- w23-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 11 bis 13, § 21 <!-- w23-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Thesis / Method aus <!-- w23-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w23-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: method-draft.md <!-- w23-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w23-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w23-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-04-26 — Entwurf des Ergebniskapitels

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w23-d2` |
| حالت کار | Screen |
| نوع | writing |
| ماژول | Thesis / Results |
| خروجی روز | `results-draft.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 14, 21 |

**دلیل:** Ergebnisse werden ohne zusätzliche Interpretation und in festen Tabellen berichtet.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Thesis / Results bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Tabelliere RQ2 Experiment A und B
- **مدرک تحقیق:** `week-33-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [The Results](https://libguides.usc.edu/writingguide/results) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Results Section und Structure and Writing Style.
  - **به‌کار ببر:** Berichte Zahlen und Beobachtungen ohne neue Interpretation; verweise auf RQ und Tabelle.
- [Accuracy, precision and recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) — Google Machine Learning Crash Course، 18 دقیقه
  - **بخوان:** True/false positives, precision, recall und F1; bearbeite die kurzen Verständnisfragen.
  - **به‌کار ببر:** Schreibe TP, FP und FN für die konkrete Extraktionsrelation aus, bevor du F1 berechnest.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Tabelliere die RQ1-Metriken <!-- w23-d2-t1-i1 -->
- [ ] Tabelliere RQ2 Experiment A und B <!-- w23-d2-t1-i2 -->
- [ ] Ergänze Fallstudien mit Evidenzpfad <!-- w23-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 14, § 21 <!-- w23-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Thesis / Results aus <!-- w23-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w23-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: results-draft.md <!-- w23-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w23-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w23-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-04-27 — Entwurf der Diskussion

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w23-d3` |
| حالت کار | Screen |
| نوع | writing |
| ماژول | Thesis / Discussion |
| خروجی روز | `discussion-draft.md + source-bucket-map.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view)؛ [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view) |
| بخش‌های Exposé | 4 bis 7, 15 bis 18 |

**دلیل:** Die Diskussion führt zu Forschungsfragen, Related Work und Validität zurück; Related Work braucht vor dem Schreiben eine sortierte Quellenliste statt loser Zitate.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Thesis / Discussion bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Begrenze Scope und Generalisierung anhand der related-work- und background-Quellen
- **مدرک تحقیق:** `week-33-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [The Discussion](https://libguides.usc.edu/writingguide/discussion) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Discussion und Organization and Structure.
  - **به‌کار ببر:** Interpretiere die Resultate gegenüber RQ, Related Work und Validitätsgrenzen, ohne neue Daten einzuführen.
- [How to Write a Research Question](https://writingcenter.gmu.edu/writing-resources/research-based-writing) — George Mason University Writing Center، 12 دقیقه
  - **بخوان:** What is a research question?, Why is it essential? und Steps to developing a research question.
  - **به‌کار ببر:** Prüfe RQ1/RQ2 auf Fokus, Messbarkeit, Machbarkeit und Bezug zu einem einzigen Problem.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Sortiere jede gelesene Quelle in genau einen Eimer: „zitiert als Grundlage“ (thesisRole cite — direkt ausgebaute Vorarbeit, meist nur ein bis zwei Quellen), „Hintergrundlektüre“ (thesisRole background — einmal gelesen, selten zitiert) oder „Related-Work-Erwähnung“ (thesisRole related-work — „bisherige Arbeiten haben X getan“, ohne Ausbau-Anspruch) <!-- w23-d3-t1-i1 -->
- [ ] Beschreibe für jede cite-Quelle in einem Satz, was diese Arbeit konkret ausbaut oder verbessert; beantworte jede Forschungsfrage direkt <!-- w23-d3-t1-i2 -->
- [ ] Begrenze Scope und Generalisierung anhand der related-work- und background-Quellen <!-- w23-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 4 bis 7, § 15 bis 18 <!-- w23-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Thesis / Discussion aus <!-- w23-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w23-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: discussion-draft.md + source-bucket-map.md <!-- w23-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w23-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w23-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-04-28 — Replikationspaket

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w23-d4` |
| حالت کار | Screen |
| نوع | writing |
| ماژول | Release |
| خروجی روز | `replication-package-v1.zip` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Xie et al. 2026: CodeFuse Query](https://drive.google.com/file/d/1cfU7FbjkIRSamwvWKbL3pTH_EC0V-ObB/view) |
| بخش‌های Exposé | 11.3, 17, 38.11 |

**دلیل:** Andere Forschende müssen den Lauf reproduzieren können.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Release bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Reduziere fehlende Abhängigkeiten auf null
- **مدرک تحقیق:** `week-33-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Führe Build- und Run-Anweisungen aus <!-- w23-d4-t1-i1 -->
- [ ] Prüfe Konfiguration, Hash und Output-Manifest <!-- w23-d4-t1-i2 -->
- [ ] Reduziere fehlende Abhängigkeiten auf null <!-- w23-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 11.3, § 17, § 38.11 <!-- w23-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Release aus <!-- w23-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w23-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: replication-package-v1.zip <!-- w23-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w23-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w23-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-04-29 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w33-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-33-integration-evidence.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view)؛ [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view)؛ [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view) |
| بخش‌های Exposé | 11 bis 13, 21, 14, 4 bis 7 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-33-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [The Results](https://libguides.usc.edu/writingguide/results) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Results Section und Structure and Writing Style.
  - **به‌کار ببر:** Berichte Zahlen und Beobachtungen ohne neue Interpretation; verweise auf RQ und Tabelle.
- [The Discussion](https://libguides.usc.edu/writingguide/discussion) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Discussion und Organization and Structure.
  - **به‌کار ببر:** Interpretiere die Resultate gegenüber RQ, Related Work und Validitätsgrenzen, ohne neue Daten einzuführen.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w33-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w33-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w33-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 11 bis 13, § 21, § 14, § 4 bis 7 <!-- capacity-w33-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w33-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w33-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-33-integration-evidence.md <!-- capacity-w33-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w33-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w33-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 34 — Thesis Draft, Reproduktion und Demo → Blocker beheben, ohne den Scope zu erweitern

- **فاز:** Phase 9: Schreiben und Abgabe / Puffer 1
- **هدف هفته:** Artefakt und Ergebnisse werden zu einem reproduzierbaren, mündlich erklärbaren Paket. Nur blockierende Fehler, fehlgeschlagene Tests und dokumentierte Lücken werden behoben.
- **خروجی الزامی هفته:** `week-34-integration-evidence.md` (روز `capacity-w34-integration`)
- **بازه:** 2027-04-30 تا 2027-05-06

### روز 1 — 2027-04-30 — Demo und Präsentation

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w23-d5` |
| حالت کار | Screen |
| نوع | writing |
| ماژول | Presentation |
| خروجی روز | `demo-script-fa-de-en.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 24, 32 |

**دلیل:** Der Wert des Artefakts muss an einem kurzen realen Pfad sichtbar werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Presentation bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Zeige Problem→Evidenz→Antwort
- **مدرک تحقیق:** `week-34-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [The Results](https://libguides.usc.edu/writingguide/results) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Results Section und Structure and Writing Style.
  - **به‌کار ببر:** Berichte Zahlen und Beobachtungen ohne neue Interpretation; verweise auf RQ und Tabelle.
- [The Discussion](https://libguides.usc.edu/writingguide/discussion) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Discussion und Organization and Structure.
  - **به‌کار ببر:** Interpretiere die Resultate gegenüber RQ, Related Work und Validitätsgrenzen, ohne neue Daten einzuführen.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Zeige Problem→Evidenz→Antwort <!-- w23-d5-t1-i1 -->
- [ ] Zeige eine korrekte Ablehnung <!-- w23-d5-t1-i2 -->
- [ ] Nenne Grenzen auf der Schlussfolie <!-- w23-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 24, § 32 <!-- w23-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Presentation aus <!-- w23-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w23-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: demo-script-fa-de-en.md <!-- w23-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w23-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w23-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-05-03 — Finaler Reproduktionslauf

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w23-d6` |
| حالت کار | Screen |
| نوع | writing |
| ماژول | Release |
| خروجی روز | `release-candidate-1` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource) |
| بخش‌های Exposé | 17, 20.2, 38.11 |

**دلیل:** Die Abgabe ist erst nach einem sauberen, erfolgreichen Lauf valide.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Release bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Dokumentiere alle Output-Hashes
- **مدرک تحقیق:** `week-34-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Führe den Lauf aus einem sauberen Checkout aus <!-- w23-d6-t1-i1 -->
- [ ] Dokumentiere alle Output-Hashes <!-- w23-d6-t1-i2 -->
- [ ] Bereite Release Tag und Changelog vor <!-- w23-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 17, § 20.2, § 38.11 <!-- w23-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Release aus <!-- w23-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w23-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: release-candidate-1 <!-- w23-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w23-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w23-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-05-04 — Blocker-Triage

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w24-d1` |
| حالت کار | Screen |
| نوع | buffer |
| ماژول | Project Management |
| خروجی روز | `blocker-board.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 20.2, 37 |

**دلیل:** Der Puffer ist nicht für neue Funktionen da, sondern beseitigt Abgabehindernisse.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Project Management bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verbinde jeden Punkt mit RQ oder Erfolgskriterium
- **مدرک تحقیق:** `week-34-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Bewerte Blocker nach Schweregrad <!-- w24-d1-t1-i1 -->
- [ ] Trenne must-fix und can-document <!-- w24-d1-t1-i2 -->
- [ ] Verbinde jeden Punkt mit RQ oder Erfolgskriterium <!-- w24-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 20.2, § 37 <!-- w24-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Project Management aus <!-- w24-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w24-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: blocker-board.md <!-- w24-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w24-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w24-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-05-05 — Extraktionsfehler beheben

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w24-d2` |
| حالت کار | Screen |
| نوع | buffer |
| ماژول | Extractors |
| خروجی روز | `extractor-hotfix + test` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Microsoft Learn: Roslyn Semantic Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/semantic-analysis) |
| بخش‌های Exposé | 14.1, 15 |

**دلیل:** Der größte RQ1-Fehler wird mit der kleinsten kontrollierten Änderung behoben.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Extractors bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Erhöhe RuleVersion
- **مدرک تحقیق:** `week-34-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Wähle eine Root Cause <!-- w24-d2-t1-i1 -->
- [ ] Erstelle vor dem Fix einen Regressionstest <!-- w24-d2-t1-i2 -->
- [ ] Erhöhe RuleVersion <!-- w24-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 14.1, § 15 <!-- w24-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Extractors aus <!-- w24-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w24-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: extractor-hotfix + test <!-- w24-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w24-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w24-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-05-06 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w34-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-34-integration-evidence.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource)؛ [Microsoft Learn: Roslyn Semantic Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/semantic-analysis) |
| بخش‌های Exposé | 24, 32, 17, 20.2 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-34-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [The Results](https://libguides.usc.edu/writingguide/results) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Results Section und Structure and Writing Style.
  - **به‌کار ببر:** Berichte Zahlen und Beobachtungen ohne neue Interpretation; verweise auf RQ und Tabelle.
- [The Discussion](https://libguides.usc.edu/writingguide/discussion) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Discussion und Organization and Structure.
  - **به‌کار ببر:** Interpretiere die Resultate gegenüber RQ, Related Work und Validitätsgrenzen, ohne neue Daten einzuführen.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w34-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w34-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w34-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 24, § 32, § 17, § 20.2 <!-- capacity-w34-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w34-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w34-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-34-integration-evidence.md <!-- capacity-w34-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w34-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w34-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 35 — Blocker beheben, ohne den Scope zu erweitern

- **فاز:** Puffer 1
- **هدف هفته:** Nur blockierende Fehler, fehlgeschlagene Tests und dokumentierte Lücken werden behoben.
- **خروجی الزامی هفته:** `week-35-integration-evidence.md` (روز `capacity-w35-integration`)
- **بازه:** 2027-05-07 تا 2027-05-13

### روز 1 — 2027-05-07 — Retrieval/Verifier beheben

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w24-d3` |
| حالت کار | Screen |
| نوع | buffer |
| ماژول | Retrieval / Verifier |
| خروجی روز | `retrieval-hotfix + metrics` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782) |
| بخش‌های Exposé | 14.2 bis 14.3, 15 |

**دلیل:** Nur der im Pilot gezeigte Fehler wird behoben und neu gemessen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Retrieval / Verifier bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Bestätige die Fehlerstufe
- **مدرک تحقیق:** `week-35-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Retrieval augmented generation and indexes](https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation) — Microsoft Learn، 18 دقیقه
  - **بخوان:** What is RAG?, Retrieve–Augment–Generate und Limitations and troubleshooting.
  - **به‌کار ببر:** Trenne Retrieval, Grounding, Generation, Citation und Verhalten bei unzureichender Evidenz.
- [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — OWASP GenAI Security Project، 15 دقیقه
  - **بخوان:** Description, attack scenarios und prevention/mitigation; beachte, dass RAG Prompt Injection nicht beseitigt.
  - **به‌کار ببر:** Behandle Dokumentinhalt als nicht vertrauenswürdige Daten und teste einen Refusal- oder Guardrail-Fall.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Bestätige die Fehlerstufe <!-- w24-d3-t1-i1 -->
- [ ] Füge einen festen Test hinzu <!-- w24-d3-t1-i2 -->
- [ ] Wiederhole den A/B-Vergleich <!-- w24-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 14.2 bis 14.3, § 15 <!-- w24-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Retrieval / Verifier aus <!-- w24-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w24-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: retrieval-hotfix + metrics <!-- w24-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w24-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w24-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-05-10 — Dokumentationslücke

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w24-d4` |
| حالت کار | Screen |
| نوع | buffer |
| ماژول | Docs |
| خروجی روز | `documentation-gap-log.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 11, 38 |

**دلیل:** Jedes wichtige Verhalten muss in Methode oder Capability Matrix auffindbar sein.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Docs bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Ergänze Ein- und Ausgabe sowie Grenzen
- **مدرک تحقیق:** `week-35-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Finde undokumentierte Regeln <!-- w24-d4-t1-i1 -->
- [ ] Ergänze Ein- und Ausgabe sowie Grenzen <!-- w24-d4-t1-i2 -->
- [ ] Prüfe Links zwischen Code und Text <!-- w24-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 11, § 38 <!-- w24-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Docs aus <!-- w24-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w24-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: documentation-gap-log.md <!-- w24-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w24-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w24-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-05-11 — Fragen der Betreuung

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w24-d5` |
| حالت کار | Screen |
| نوع | buffer |
| ماژول | Presentation |
| خروجی روز | `supervisor-qa.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 22, 32 |

**دلیل:** Schwierige Fragen sollten vor dem Gespräch sichtbar werden.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Presentation bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Nimm eine zweiminütige Antwort für jede Frage auf
- **مدرک تحقیق:** `week-35-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [Retrieval augmented generation and indexes](https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation) — Microsoft Learn، 18 دقیقه
  - **بخوان:** What is RAG?, Retrieve–Augment–Generate und Limitations and troubleshooting.
  - **به‌کار ببر:** Trenne Retrieval, Grounding, Generation, Citation und Verhalten bei unzureichender Evidenz.
- [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — OWASP GenAI Security Project، 15 دقیقه
  - **بخوان:** Description, attack scenarios und prevention/mitigation; beachte, dass RAG Prompt Injection nicht beseitigt.
  - **به‌کار ببر:** Behandle Dokumentinhalt als nicht vertrauenswürdige Daten und teste einen Refusal- oder Guardrail-Fall.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Formuliere fünf methodische Fragen <!-- w24-d5-t1-i1 -->
- [ ] Formuliere fünf Scope-Fragen <!-- w24-d5-t1-i2 -->
- [ ] Nimm eine zweiminütige Antwort für jede Frage auf <!-- w24-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 22, § 32 <!-- w24-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Presentation aus <!-- w24-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w24-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: supervisor-qa.md <!-- w24-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w24-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w24-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-05-12 — Puffer-Gate

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w24-d6` |
| حالت کار | Screen |
| نوع | buffer |
| ماژول | Release |
| خروجی روز | `release-candidate-2` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 17, 20.2 |

**دلیل:** Der Puffer wird erst geschlossen, wenn der Release Candidate wieder grün ist.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Release bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Dokumentiere übrige Punkte als Einschränkung
- **مدرک تحقیق:** `week-35-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Schließe alle must-fix-Punkte <!-- w24-d6-t1-i1 -->
- [ ] Führe vollständigen Test und Reproduktion aus <!-- w24-d6-t1-i2 -->
- [ ] Dokumentiere übrige Punkte als Einschränkung <!-- w24-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 17, § 20.2 <!-- w24-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Release aus <!-- w24-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w24-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: release-candidate-2 <!-- w24-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w24-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w24-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-05-13 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w35-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-35-integration-evidence.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782) |
| بخش‌های Exposé | 14.2 bis 14.3, 15, 11, 38 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-35-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w35-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w35-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w35-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 14.2 bis 14.3, § 15, § 11, § 38 <!-- capacity-w35-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w35-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w35-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-35-integration-evidence.md <!-- capacity-w35-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w35-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w35-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 36 — Finale Abgabe ohne offene Schulden

- **فاز:** Puffer 2 und Abschluss
- **هدف هفته:** Dateien, Präsentation und Fortschrittsbericht werden finalisiert; neuer Scope ist verboten.
- **خروجی الزامی هفته:** `week-36-integration-evidence.md` (روز `capacity-w36-integration`)
- **بازه:** 2027-05-14 تا 2027-05-20

### روز 1 — 2027-05-14 — Finales Datenaudit

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w25-d1` |
| حالت کار | Screen |
| نوع | buffer |
| ماژول | Evaluation / Audit |
| خروجی روز | `final-data-audit.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 14, 38.11 |

**دلیل:** Rohdaten, Metriken und Tabellen müssen konsistent sein.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Evaluation / Audit bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Gleiche die Hashes ab
- **مدرک تحقیق:** `week-36-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Gleiche die Hashes ab <!-- w25-d1-t1-i1 -->
- [ ] Vergleiche Zahlen in Text und JSON <!-- w25-d1-t1-i2 -->
- [ ] Verbinde jedes Diagramm mit seiner Quelldatei <!-- w25-d1-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 14, § 38.11 <!-- w25-d1-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Evaluation / Audit aus <!-- w25-d1-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w25-d1-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: final-data-audit.md <!-- w25-d1-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w25-d1-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w25-d1-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-05-17 — Finales Quellenaudit

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w25-d2` |
| حالت کار | Screen |
| نوع | buffer |
| ماژول | Release / Audit |
| خروجی روز | `source-audit.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource) |
| بخش‌های Exposé | 9.3, 11.3, 19 |

**دلیل:** Versionen von Code, Corpus und Abhängigkeiten müssen exakt dokumentiert sein.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Release / Audit bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Prüfe die Lizenzen erneut
- **مدرک تحقیق:** `week-36-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Dokumentiere alle Commits <!-- w25-d2-t1-i1 -->
- [ ] Prüfe die Lizenzen erneut <!-- w25-d2-t1-i2 -->
- [ ] Führe einen Clean Build aus <!-- w25-d2-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 9.3, § 11.3, § 19 <!-- w25-d2-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Release / Audit aus <!-- w25-d2-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w25-d2-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: source-audit.md <!-- w25-d2-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w25-d2-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w25-d2-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-05-18 — Finaler Thesis-Quervergleich

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w25-d3` |
| حالت کار | Screen |
| نوع | buffer |
| ماژول | Thesis |
| خروجی روز | `thesis-traceability-matrix.csv` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 7, 16, 21 |

**دلیل:** Jede Forschungsfrage braucht passende Methode, Ergebnis und Diskussion.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Thesis bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Lasse keinen Claim ohne Ergebnis
- **مدرک تحقیق:** `week-36-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [The Discussion](https://libguides.usc.edu/writingguide/discussion) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Discussion und Organization and Structure.
  - **به‌کار ببر:** Interpretiere die Resultate gegenüber RQ, Related Work und Validitätsgrenzen, ohne neue Daten einzuführen.
- [How to Write a Research Question](https://writingcenter.gmu.edu/writing-resources/research-based-writing) — George Mason University Writing Center، 12 دقیقه
  - **بخوان:** What is a research question?, Why is it essential? und Steps to developing a research question.
  - **به‌کار ببر:** Prüfe RQ1/RQ2 auf Fokus, Messbarkeit, Machbarkeit und Bezug zu einem einzigen Problem.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Prüfe die Traceability von RQ1 <!-- w25-d3-t1-i1 -->
- [ ] Prüfe die Traceability von RQ2 <!-- w25-d3-t1-i2 -->
- [ ] Lasse keinen Claim ohne Ergebnis <!-- w25-d3-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 7, § 16, § 21 <!-- w25-d3-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Thesis aus <!-- w25-d3-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w25-d3-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: thesis-traceability-matrix.csv <!-- w25-d3-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w25-d3-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w25-d3-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-05-19 — Finale Präsentationsprobe

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w25-d4` |
| حالت کار | Screen |
| نوع | buffer |
| ماژول | Presentation |
| خروجی روز | `rehearsal-record.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 24, 32 |

**دلیل:** Die Präsentation muss unabhängig vom Text und in kontrollierter Zeit funktionieren.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Presentation bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Beantworte drei schwierige Fragen frei
- **مدرک تحقیق:** `week-36-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [The Results](https://libguides.usc.edu/writingguide/results) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Results Section und Structure and Writing Style.
  - **به‌کار ببر:** Berichte Zahlen und Beobachtungen ohne neue Interpretation; verweise auf RQ und Tabelle.
- [The Discussion](https://libguides.usc.edu/writingguide/discussion) — USC Libraries Research Guide، 15 دقیقه
  - **بخوان:** Definition, Importance of a Good Discussion und Organization and Structure.
  - **به‌کار ببر:** Interpretiere die Resultate gegenüber RQ, Related Work und Validitätsgrenzen, ohne neue Daten einzuführen.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Halte die Präsentation mit Zeitmessung <!-- w25-d4-t1-i1 -->
- [ ] Übe den Fallback bei Demo-Ausfall <!-- w25-d4-t1-i2 -->
- [ ] Beantworte drei schwierige Fragen frei <!-- w25-d4-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 24, § 32 <!-- w25-d4-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Presentation aus <!-- w25-d4-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w25-d4-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: rehearsal-record.md <!-- w25-d4-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w25-d4-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w25-d4-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-05-20 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w36-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-36-integration-evidence.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource) |
| بخش‌های Exposé | 14, 38.11, 9.3, 11.3 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-36-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w36-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w36-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w36-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 14, § 38.11, § 9.3, § 11.3 <!-- capacity-w36-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w36-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w36-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-36-integration-evidence.md <!-- capacity-w36-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w36-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w36-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## هفته 37 — Finale Abgabe ohne offene Schulden

- **فاز:** Puffer 2 und Abschluss / Abgabe
- **هدف هفته:** Dateien, Präsentation und Fortschrittsbericht werden finalisiert; neuer Scope ist verboten. Die Abgabe in einer sauberen Umgebung reproduzierbar nachweisen.
- **خروجی الزامی هفته:** `week-37-integration-evidence.md` (روز `capacity-w37-integration`)
- **بازه:** 2027-05-21 تا 2027-05-27

### روز 1 — 2027-05-21 — Archiv und Übergabe

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w25-d5` |
| حالت کار | Screen |
| نوع | buffer |
| ماژول | Release |
| خروجی روز | `final-handoff.zip` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) |
| بخش‌های Exposé | 17, 20.2 |

**دلیل:** Die Abgabeversion muss von Arbeitsdateien getrennt sein.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 1/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Release bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Liste die Release-Artefakte
- **مدرک تحقیق:** `week-37-day-1-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Liste die Release-Artefakte <!-- w25-d5-t1-i1 -->
- [ ] Teste das Schnellstart-README <!-- w25-d5-t1-i2 -->
- [ ] Erzeuge Backup und Prüfsumme <!-- w25-d5-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 17, § 20.2 <!-- w25-d5-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Release aus <!-- w25-d5-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w25-d5-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: final-handoff.zip <!-- w25-d5-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w25-d5-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w25-d5-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 2 — 2027-05-24 — Programmabschluss und Fortschrittsrückblick

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `w25-d6` |
| حالت کار | Screen |
| نوع | buffer |
| ماژول | Reports |
| خروجی روز | `final-progress-report.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view) |
| بخش‌های Exposé | 16, 17, 20 |

**دلیل:** Der letzte Tag fasst die Evidenz der geleisteten Arbeit zusammen und fügt nichts Neues hinzu.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 2/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Reports bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Notiere wichtigste Erkenntnis und Einschränkung
- **مدرک تحقیق:** `week-37-day-2-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Hake die Ergebnisse jeder Phase ab <!-- w25-d6-t1-i1 -->
- [ ] Notiere wichtigste Erkenntnis und Einschränkung <!-- w25-d6-t1-i2 -->
- [ ] Formuliere die erste Handlung nach der Abgabe in einem Satz <!-- w25-d6-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 16, § 17, § 20 <!-- w25-d6-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Reports aus <!-- w25-d6-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- w25-d6-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: final-progress-report.md <!-- w25-d6-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- w25-d6-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- w25-d6-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 3 — 2027-05-25 — Offene Qualitätskriterien schließen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-final-quality` |
| حالت کار | Screen |
| نوع | buffer |
| ماژول | Final Quality Closure |
| خروجی روز | `final-quality-closure.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view) |
| بخش‌های Exposé | 16, 17, 20 |

**دلیل:** Der Vollzeitplan endet nicht mit halbfertigen Prüfungen, sondern mit nachvollziehbar geschlossenen Qualitätskriterien.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 3/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Final Quality Closure bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Dokumentiere bewusst verbleibende Grenzen
- **مدرک تحقیق:** `week-37-day-3-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [How to specify quality requirements](https://quality.arc42.org/articles/specify-quality-requirements) — arc42 Quality Model، 15 دقیقه
  - **بخوان:** Quality Attribute Scenarios: stimulus, artifact, environment, response und metric.
  - **به‌کار ببر:** Mache Reproduzierbarkeit, Erklärbarkeit oder Sicherheit mit einer messbaren Reaktion prüfbar.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Finde jedes noch offene Akzeptanzkriterium <!-- capacity-final-quality-t1-i1 -->
- [ ] Schließe nur belegbare Lücken <!-- capacity-final-quality-t1-i2 -->
- [ ] Dokumentiere bewusst verbleibende Grenzen <!-- capacity-final-quality-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 16, § 17, § 20 <!-- capacity-final-quality-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Final Quality Closure aus <!-- capacity-final-quality-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-final-quality-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: final-quality-closure.md <!-- capacity-final-quality-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-final-quality-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-final-quality-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 4 — 2027-05-26 — Reproduzierbarkeit aus sauberer Umgebung prüfen

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-final-reproducibility` |
| حالت کار | Screen |
| نوع | buffer |
| ماژول | Release / Reproducibility |
| خروجی روز | `final-clean-run-evidence.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource) |
| بخش‌های Exposé | 11.3, 17, 20.2 |

**دلیل:** Ein letzter Clean-Run beweist, dass Artefakt, Test und Dokumentation außerhalb der Arbeitsumgebung zusammenpassen.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Projektwissen gezielt lernen und sofort anwenden
- **حالت / بلوک:** project-learning، بلوک 4/5، 240 دقیقه
- **فقط این را بخوان:** Nur die unten genannte Quelle und die exakten Tagesfragen zu Release / Reproducibility bearbeiten.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Vergleiche Ergebnis, Version und dokumentierte Befehle
- **مدرک تحقیق:** `week-37-day-4-learning-note.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [When is a build reproducible?](https://reproducible-builds.org/docs/definition/) — Reproducible Builds، 10 دقیقه
  - **بخوان:** Definition, build environment, instructions, artifacts und bit-by-bit verification.
  - **به‌کار ببر:** Fixiere Source-Revision, Toolchain, Konfiguration und prüfe das Ergebnis mit einem Hash.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Starte aus einer sauberen Umgebung <!-- capacity-final-reproducibility-t1-i1 -->
- [ ] Führe Schnellstart und Kerntests aus <!-- capacity-final-reproducibility-t1-i2 -->
- [ ] Vergleiche Ergebnis, Version und dokumentierte Befehle <!-- capacity-final-reproducibility-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 11.3, § 17, § 20.2 <!-- capacity-final-reproducibility-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Release / Reproducibility aus <!-- capacity-final-reproducibility-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-final-reproducibility-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: final-clean-run-evidence.md <!-- capacity-final-reproducibility-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-final-reproducibility-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-final-reproducibility-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

### روز 5 — 2027-05-27 — Wochenintegration, Erklärung und Testbeleg

| مشخصه | مقدار |
| --- | --- |
| شناسه پایدار | `capacity-w37-integration` |
| حالت کار | Screen |
| نوع | evaluation |
| ماژول | Weekly Integration / Evidence |
| خروجی روز | `week-37-integration-evidence.md` |
| منبع‌ها | [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9)؛ [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view)؛ [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource) |
| بخش‌های Exposé | 17, 20.2, 16, 20 |

**دلیل:** Vier kleine Projektschritte werden erst durch einen gemeinsamen Test, eine freie Erklärung und einen rückverfolgbaren Beleg zu belastbarem Wochenfortschritt.

#### مسیر تحقیق یا یادگیری

- **عنوان:** Wochenwissen frei erklären und dokumentieren
- **حالت / بلوک:** project-learning، بلوک 5/5، 240 دقیقه
- **فقط این را بخوان:** Keine neue Quelle. Die vier Projektentscheidungen der Woche aus dem Gedächtnis erklären und nur konkrete Lücken gezielt prüfen.
- **امروز نخوان:** Keine zusätzlichen Tabs, Tutorials oder vollständigen Dokumentationen öffnen, die das heutige Ergebnis nicht direkt ermöglichen.
- **پرسش راهنما:** Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll
- **مدرک تحقیق:** `week-37-research-synthesis.md`
- **قانون توقف:** Stoppe nach einer verständlichen Idee, einer dokumentierten Entscheidung und einem direkten Bezug zum heutigen Projektartefakt.

#### پیش‌نیازهای کوتاه

- [What is the Definition of Done?](https://www.atlassian.com/agile/project-management/definition-of-done) — Atlassian، 10 دقیقه
  - **بخوان:** Build a completion checklist und Assign acceptance criteria to user stories.
  - **به‌کار ببر:** Beende die Arbeit erst mit Artefakt, Test oder Sanity Check und rückverfolgbarem Beleg.
- [Continuous integration with GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration) — GitHub Docs، 12 دقیقه
  - **بخوان:** About continuous integration und About CI using GitHub Actions.
  - **به‌کار ببر:** Definiere den automatischen Build/Test-Schritt und das Artefakt, das bei Fehlern geprüft werden muss.

#### چک‌لیست روز

**1. Finden und verstehen — 80 دقیقه**

- [ ] Erkläre den Zusammenhang der vier Tagesergebnisse ohne Quelle <!-- capacity-w37-integration-t1-i1 -->
- [ ] Führe den wichtigsten gemeinsamen Test oder Sanity Check erneut aus <!-- capacity-w37-integration-t1-i2 -->
- [ ] Verknüpfe Ergebnis, Test und Quellenbeleg in einem Wochenprotokoll <!-- capacity-w37-integration-t1-i3 -->

**2. Mit dem Projekt verbinden — 100 دقیقه**

- [ ] Verbinde diese drei Punkte mit § 17, § 20.2, § 16, § 20 <!-- capacity-w37-integration-t2-i1 -->
- [ ] Führe ein reales Beispiel oder Fixture in Weekly Integration / Evidence aus <!-- capacity-w37-integration-t2-i2 -->
- [ ] Dokumentiere eine SourceLocation oder einen rückverfolgbaren Beleg für das Ergebnis <!-- capacity-w37-integration-t2-i3 -->

**3. Ergebnis erstellen — 60 دقیقه**

- [ ] Erstelle das Tagesergebnis: week-37-integration-evidence.md <!-- capacity-w37-integration-t3-i1 -->
- [ ] Führe mindestens einen Test, Sanity Check oder eine unabhängige Prüfung durch <!-- capacity-w37-integration-t3-i2 -->
- [ ] Speichere den kurzen Tagesbericht und setze den Status auf „Erledigt“ <!-- capacity-w37-integration-t3-i3 -->

#### ثبت نتیجه

- **Artefakt:**
- **Test / Prüfung:**
- **Evidence:**
- **نتیجه حداکثر سه‌خطی برای Tracker:**
- **قدم بعدی فردا:**

## فهرست منابع

- Abedu et al. 2025: LLM + Knowledge Graph Repository QA — `abeduKgQa` — priority: core — thesis role: related-work
- [Allamanis et al. 2018: Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740) — `allamanis` — priority: core — thesis role: background
- [Alshemaimri et al. 2021: Database Code Fragments Survey](https://onlinelibrary.wiley.com/doi/full/10.1002/eng2.12441) — `alshemaimri` — priority: important — thesis role: related-work
- [arc42: Vorlage zur Softwarearchitektur-Dokumentation](https://arc42.org/overview/) — `arc42` — priority: support
- [C4 Model: Context-, Container- und Component-Diagramme](https://c4model.com/diagrams) — `c4` — priority: support
- [Cheng et al. 2024: DraCo](https://arxiv.org/pdf/2405.19782) — `draco` — priority: important — thesis role: related-work
- [Cross_Repository_Code_Intelligence Lern-Exposé v2.4](/pdf-reader?document=expose&name=Cross_Repository_Code_Intelligence%20%E2%80%93%20Expos%C3%A9) — `proposal` — priority: core
- [Danphe EMR: eingefrorener Commit 0b5d6b8](https://github.com/hospital-management-system-emr/hospital-management-system-emr-opensource) — `danphe` — priority: core
- [Dettmers et al. 2023: QLoRA](https://arxiv.org/abs/2305.14314) — `qlora` — priority: course
- [Devlin et al. 2019: BERT](https://aclanthology.org/N19-1423/) — `bert` — priority: course
- [Feng et al. 2020: CodeBERT](https://aclanthology.org/2020.findings-emnlp.139/) — `codebert` — priority: important — thesis role: background
- Gandhi et al. 2025: Repository-Level Code Search — `gandhiRetrieval` — priority: important — thesis role: related-work
- [Google Machine Learning Crash Course: Introduction to Large Language Models](https://developers.google.com/machine-learning/crash-course/llm) — `googleLlmCrashCourse` — priority: course
- [Guo et al. 2021: GraphCodeBERT](https://arxiv.org/pdf/2009.08366) — `graphcodebert` — priority: optional — thesis role: background
- [Hevner et al. 2004: Design Science in IS Research](https://drive.google.com/file/d/1HSYD3dBut18RlbXnO_ufdlT8lHXkg0am/view) — `hevner` — priority: core — thesis role: cite
- Hou et al. 2024: LLMs for Software Engineering Review — `houLlmReview` — priority: support — thesis role: related-work
- [Hu et al. 2021: LoRA](https://arxiv.org/abs/2106.09685) — `lora` — priority: course
- [Keras 3: Embedding Layer](https://keras.io/api/layers/core_layers/embedding/) — `embeddings` — priority: course
- [Keras 3: GRU](https://keras.io/api/layers/recurrent_layers/gru/) — `gru` — priority: course
- [Keras 3: LSTM](https://keras.io/api/layers/recurrent_layers/lstm/) — `lstm` — priority: course
- [Keras 3: SimpleRNN](https://keras.io/api/layers/recurrent_layers/simple_rnn/) — `rnn` — priority: course
- [Keras-Beispiel: Bidirectional LSTM on IMDB](https://keras.io/examples/nlp/bidirectional_lstm_imdb/) — `sentiment` — priority: course
- [Keras-Beispiel: Character-level Seq2Seq](https://keras.io/examples/nlp/lstm_seq2seq/) — `seq2seq` — priority: course
- Lekssays 2025: LLMxCPG — `llmxCpg` — priority: support — thesis role: related-work
- Lekssays 2026: Bridging CPGs and Language Models — `codebadger` — priority: important — thesis role: related-work
- [Lewis et al. 2020: Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401) — `rag` — priority: course
- [Microsoft Learn: Architecture Decision Records](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record) — `adr` — priority: support
- [Microsoft Learn: EF Core Entity Mapping](https://learn.microsoft.com/en-us/ef/core/modeling/entity-types#table-name) — `efMapping` — priority: support
- [Microsoft Learn: EF Core Querying](https://learn.microsoft.com/en-us/ef/core/querying/) — `efQuerying` — priority: support
- [Microsoft Learn: EF Core Saving](https://learn.microsoft.com/en-us/ef/core/saving/) — `efSaving` — priority: support
- [Microsoft Learn: Roslyn Semantic Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/semantic-analysis) — `roslynSemantic` — priority: support
- [Microsoft Learn: Roslyn Syntax Analysis](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/get-started/syntax-analysis) — `roslynSyntax` — priority: support
- [Microsoft Learn: Roslyn Workspace](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/work-with-workspace) — `roslynWorkspace` — priority: support
- [Nagy et al. 2015: Where Was This SQL Query Executed?](https://drive.google.com/file/d/1wCjThO0mfOJXrYpWZUUgJEX5ohs0wDOc/view) — `nagy` — priority: core — thesis role: cite
- [Neo4j GraphAcademy: Cypher Fundamentals](https://graphacademy.neo4j.com/courses/cypher-fundamentals) — `cypher` — priority: support
- [Neo4j: Data Modeling](https://neo4j.com/docs/getting-started/data-modeling/) — `neo4jModeling` — priority: support
- Olea et al. 2024: Persona Prompting for Question Answering — `oleaPrompting` — priority: important — thesis role: related-work
- [Papineni et al. 2002: BLEU](https://aclanthology.org/P02-1040/) — `bleu` — priority: course
- [Peng et al. 2026: SWE-QA](https://drive.google.com/file/d/15eGjHmpQ_YDfCnJBy535PoKQ-TEyWtpj/view) — `sweqa` — priority: important — thesis role: related-work
- [Petroni et al. 2021: KILT](https://arxiv.org/pdf/2009.02252) — `kilt` — priority: important — thesis role: related-work
- [Radford et al. 2019: Language Models are Unsupervised Multitask Learners](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) — `gpt` — priority: course
- [scikit-learn: Cosine Similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html) — `cosine` — priority: course
- [scikit-learn: Text Feature Extraction und TF-IDF](https://scikit-learn.org/stable/modules/feature_extraction.html) — `tfidf` — priority: course
- Shah et al. 2025: RANGER — `ranger` — priority: important — thesis role: related-work
- [Shatnawi et al. 2019: Static Analysis of Multilanguage Systems](https://drive.google.com/file/d/14rdyqlM40QBIXIb0KtrvKBFAMTQ6KYRO/view) — `shatnawi` — priority: core — thesis role: background
- Tao et al. 2025: Code Graph Model — `codeGraphModel` — priority: support — thesis role: related-work
- Tao et al. 2026: Retrieval-Augmented Code Generation Survey — `ragCodeSurvey` — priority: support — thesis role: related-work
- [Usai et al. 2026: LogicLens](https://drive.google.com/file/d/1_yzTxjxahfnOH-Q_ZaehvmHN6xxi-3QE/view) — `logiclens` — priority: core — thesis role: related-work
- [Vaswani et al. 2017: Attention Is All You Need](https://arxiv.org/abs/1706.03762) — `attention` — priority: course
- [Xie et al. 2026: CodeFuse Query](https://drive.google.com/file/d/1cfU7FbjkIRSamwvWKbL3pTH_EC0V-ObB/view) — `codefuse` — priority: core — thesis role: related-work
- [Yamaguchi et al. 2014: Code Property Graphs](https://drive.google.com/file/d/1SGWMjZA8Im9fXsuZxr6KnKdgijDH4o8r/view) — `yamaguchi` — priority: core — thesis role: background
- Zhang et al. 2023: RepoCoder — `repocoder` — priority: support — thesis role: related-work
- Zhang et al. 2024: Survey on LLMs for Software Engineering — `zhangLlmSurvey` — priority: support — thesis role: background
