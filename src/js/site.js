/* Hu Kai 个人网站：唯一的浏览器 JavaScript 源文件。按下方折叠区域编辑对应功能。 */

// #region 01 多语言文案：英文、中文、日文
const english = {
    "language.label": "Language",
    "home.title": "Hu Kai - Personal Website",
    "home.welcome": "Welcome! I am currently learning coding and web development. I hope you can give me some valuable advice.",
    "home.cv": "View my CV",
    "home.certificates": "Certificates & Achievements",
    "cert.title": "Hu Kai - Certificates & Achievements",
    "cert.intro": "Academic qualifications, certifications and language test results, alongside work experience and a study tour during university.",
    "cert.languageTest": "Language test",
    "cert.totalScore": "Total score",
    "cert.listening": "Listening",
    "cert.reading": "Reading",
    "cert.testDate": "Test date",
    "cert.toeicAlt": "Hu Kai's official TOEIC Listening & Reading score certificate: total 800, Listening 460 and Reading 340",
    "cv.toeicResult": "Listening 460 · Reading 340 · Test date: March 1, 2025",
    "cert.fpName": "FinancialPlanner Level3",
    "cert.fpIssuer": "KINZAI Institute for Financial Affairs, Inc. / Japan Association for Financial Planners (JAFP)",
    "cert.fpAlt": "Hu Kai's FinancialPlanner Level3 certificate",
    "cert.accountingName": "Business Accounting Examination, Grade 3",
    "cert.accountingIssuer": "Osaka Chamber of Commerce and Industry",
    "cert.accountingAlt": "Hu Kai's Business Accounting Examination Grade 3 certificate",
    "cv.fpDate": "Issued October 24, 2022",
    "cv.accountingDate": "Issued October 16, 2022",
    "cert.n1Name": "Japanese-Language Proficiency Test N1 (JLPT)",
    "cert.n1Issuer": "Japan Educational Exchanges and Services / The Japan Foundation",
    "cert.n1Alt": "Hu Kai's JLPT N1 certificate of result and scores, passed",
    "cert.result": "Result",
    "cert.passed": "Passed",
    "cv.n1Result": "Passed · Test date: December 5, 2021",
    "cert.hint": "Select a scan to view it in the certificate gallery.",
    "cert.academic": "Academic qualification",
    "cert.professional": "Certification",
    "cert.degreeName": "Bachelor of Sociology",
    "cert.degreeDescription": "Graduation certificate and diploma, Faculty of Sociology, Department of International Sociology.",
    "cert.aiName": "Generative AI Passport",
    "cert.aiIssuer": "Association to Generalize Utilization of Generative AI (GUGA)",
    "cert.aiDescription": "Certificate of passing the Generative AI Passport examination.",
    "cert.issued": "Issued",
    "cert.open": "View full-size scan ↗",
    "cert.degreeAlt": "Toyo University graduation certificate and Bachelor of Sociology diploma for Hu Kai",
    "cert.aiAlt": "GUGA Generative AI Passport certificate for Hu Kai",
    "cert.awsAlt": "AWS Certified Cloud Practitioner certificate for Kai Hu",
    "cert.awsAifName": "AWS Certified AI Practitioner (AIF)",
    "cert.awsAifIssuer": "Amazon Web Services (AWS)",
    "cert.awsAifAlt": "AWS Certified AI Practitioner certificate issued to Kai Hu",
    "cv.qualifications": "Qualifications",
    "cv.awsDates": "Issued September 23, 2026",
    "cv.awsAifDate": "Issued October 16, 2026",
    "cv.aiDate": "Issued July 15, 2026",
    "cert.itPassportName": "IT Passport Examination",
    "cert.itPassportIssuer": "Innovation Platform Agency, Japan (IPA)",
    "cert.itPassportDescription": "Passed the IT Passport examination in June 2026. Examination result report attached.",
    "cert.itPassportAlt": "Hu Kai's IT Passport examination result report: June 29, 2026, passed",
    "cv.itPassportResult": "Passed in June 2026 · Test date: June 29, 2026",
    "cert.drivingName": "Japanese Driving Licence",
    "cert.drivingSchool": "Nishiwaki Driving School",
    "cert.drivingDescription": "Obtained a Japanese driving licence in January 2026. Photo of the driving school's graduation commemorative cover.",
    "cert.drivingAlt": "Graduation commemorative cover from Nishiwaki Driving School",
    "cert.obtained": "Obtained",
    "cert.openPhoto": "View full-size photo ↗",
    "cv.drivingDate": "Obtained in January 2026",
    "cert.openPdf": "View original PDF ↗",
    "home.about": "About Me",
    "home.aboutBody": "I majored in sociology, which means I had never studied anything related to computers before. However, I am willing to give it a try.",
    "home.goal": "My Goal",
    "home.goalBody": "My goal is to complete some projects on my own.",
    "home.direction": "Project Direction",
    "home.stepOne": "Step One",
    "home.stepOneBody": "Perhaps I will create some simple game models as my first attempt.",
    "home.stepTwo": "Step Two",
    "home.stepTwoBody": "Strengthen my foundational skills and my English writing skills.",
    "home.stepThree": "Step Three",
    "home.stepThreeBody": "Create some project independently.",
    "home.information": "My Information",
    "home.name": "Name",
    "home.major": "Major",
    "home.majorValue": "Sociology in Global Diversity Studies",
    "home.educationValue": "Bachelor of Sociology (Toyo University)",
    "home.languages": "Languages",
    "home.languagesValue": "Chinese (Native), Japanese (Professional), English (Intermediate), Spanish (Beginner)",
    "home.nationality": "Nationality",
    "home.nationalityValue": "China",
    "home.location": "Location",
    "home.locationValue": "Tokyo, Japan",
    "site.crestAlt": "Hu Kai’s personal coat of arms",
    "home.copyright": "© 2026 Hu Kai. All rights reserved.",
    "cv.title": "Hu Kai - Curriculum Vitae",
    "cv.heading": "Curriculum Vitae",
    "cv.personal": "Personal Information",
    "cv.name": "NAME:",
    "cv.gender": "GENDER:",
    "cv.genderValue": "Male",
    "cv.birthDate": "BIRTH DATE:",
    "cv.nationality": "NATIONALITY:",
    "cv.nationalityValue": "Chinese",
    "cv.selfPR": "Self-PR",
    "cv.selfPRBody": "I am a motivated and adaptable person with experience in customer service and sales. I am currently developing my IT skills through independent learning and practical projects.",
    "cv.skills": "Skills",
    "cv.skillsValue": "Chinese, Japanese, English, Python, HTML, CSS, Adobe Photoshop, Adobe Premiere Pro, SQL, Blender, AI Agent, Cloud",
    "cv.stampAlt": "Imperium stamp",
    "cv.stampButton": "Stamp",
    "cv.linkedin": "View my LinkedIn profile",
    "cv.pdfResume": "View PDF résumé ↗",
    "cv.back": "← Back to home",
    "music.title": "Imperial Hymn",
    "education.label": "Education",
    "education.university": "Toyo University",
    "education.degree": "Bachelor of Sociology",
    "education.graduated": "Graduated in 2026",
    "nav.home": "Home",
    "nav.cv": "Curriculum Vitae",
    "nav.label": "Main navigation",
    "site.skip": "Skip to content",
    "home.kicker": "PERSONAL ARCHIVE",
    "home.subtitle": "Sociology · Cloud · Creative Technology",
    "home.profile": "Based in Tokyo, Japan",
    "home.explore": "Explore my certificates & achievements",
    "home.archive": "Learning, building, moving forward.",
    "cert.kicker": "CERTIFICATES & ACHIEVEMENTS ARCHIVE",
    "cert.all": "All certificates",
    "cert.filters": "Filter qualifications",
    "cert.count": "{count} certificates",
    "viewer.close": "Close certificate",
    "viewer.previous": "Previous certificate",
    "viewer.next": "Next certificate",
    "viewer.position": "{current} / {total}",
    "viewer.error": "The image could not load. Open the original scan using the link below.",
    "audio.marchTitle": "Astra Militarum — Muster",
    "audio.enable": "Enable sound",
    "audio.disable": "Turn sound off",
    "audio.mute": "Mute",
    "audio.unmute": "Unmute",
    "audio.volume": "Volume",
    "audio.ready": "Sound off · click to begin",
    "audio.loading": "Preparing the soundscape…",
    "audio.playing": "Sound on",
    "audio.muted": "Muted",
    "audio.unavailable": "Audio is unavailable in this browser",
    "audio.description": "Marching boots, drums, brass and distant engines",
    "audio.hymnDescription": "Original synthesized organ hymn",
    "cv.kicker": "PERSONNEL DOSSIER",
    "art.title": "Hu Kai - ArtWorks Exhibit",
    "art.heading": "ArtWorks Exhibit",
    "art.kicker": "ARTWORKS / 008",
    "art.intro": "In-game demonstrations of my Blender creations.",
    "art.explore": "Explore the exhibition",
    "art.open": "View original image ↗",
    "art.contents": "Exhibition contents",
    "art.menswearAlt": "A character wearing a flat cap, waistcoat, white shirt and tie in a game scene.",
    "art.acanthusAlt": "A mounted knight with black and gold acanthus-patterned armour, shield and horse armour.",
    "art.joustingAlt": "A mounted knight wearing fluted metal jousting armour and carrying a lance.",
    "art.heavyArmourAlt": "A knight in heavy metal armour holding a decorated polearm in a wooded game scene.",
    "art.landsknechtAlt": "A landsknecht wearing bright German Renaissance armour and colourful clothing in a game scene.",
    "art.royalConquerorAlt": "A mounted conqueror in ornate black and gold armour in a desert game scene.",
    "art.wwiRaiderAlt": "A WWI trench raider wearing dark steel armour, a helmet and round goggles in a game scene.",
    "art.blackLongCoatAlt": "A character wearing a black coat and broad-brimmed hat in a desert game scene.",
    "works.heading": "MyWorks",
    "works.title": "Hu Kai - MyWorks",
    "works.kicker": "WORKS DIRECTORY",
    "works.intro": "Explore my GitHub projects, Nexus Mods creations and QuizSite practice website.",
    "works.githubCategory": "SOURCE & PROJECTS",
    "works.githubDescription": "Browse my repositories, source code and project updates.",
    "works.modsCategory": "GAME MODIFICATIONS",
    "works.modsDescription": "Explore my Nexus Mods profile and game modifications.",
    "works.quizCategory": "QUIZ & PRACTICE",
    "works.quizDescription": "Visit my QuizSite website for question practice and review.",
    "cert.toeicSwName": "TOEIC Speaking & Writing",
    "cert.speaking": "Speaking",
    "cert.writing": "Writing",
    "cert.toeicSwAlt": "Hu Kai's official TOEIC Speaking & Writing score certificate: Speaking 120 out of 200 and Writing 130 out of 200",
    "cv.toeicSwResult": "Speaking 120 / 200 · Writing 130 / 200 · Test date: September 13, 2026",
    "cert.toeicLrName": "TOEIC Listening & Reading",
    "cert.toeicLrType": "Listening & Reading",
    "cert.archiveHeading": "Certificates",
    "experience.heading": "Experience & Milestones",
    "experience.hotelCategory": "WORK EXPERIENCE · UNIVERSITY YEARS",
    "experience.hotelTitle": "Hotel Banquet Service & Busboy",
    "experience.hotelStart": "April 2022",
    "experience.hotelEnd": "August 2025",
    "experience.until": " to ",
    "experience.hotelBody": "During university, I worked in hotel banquet service and as a busboy from April 2022 to August 2025.",
    "experience.hotelAlt": "Hu Kai wearing a hotel service uniform",
    "experience.hotelCaption": "A photo from my hotel work experience.",
    "experience.openPhoto": "View original photo ↗",
    "experience.studyCategory": "STUDY TOUR · PAPUA NEW GUINEA",
    "experience.studyTitle": "Papua New Guinea Study Tour",
    "experience.studyDate": "September 2023",
    "experience.studyBody": "In September 2023, I joined a study tour in Papua New Guinea and visited JICA, the Japan International Cooperation Agency, with my group members for learning and exchange.",
    "experience.studyAlt": "Group photo from the study tour's visit to JICA",
    "experience.studyCaption": "Learning and exchange at JICA with my study tour group.",
    "experience.copperCategory": "INTERNSHIP · GUANGDONG, CHINA",
    "experience.copperTitle": "Copper Materials Retail Internship",
    "experience.copperDate": "February 2024",
    "experience.copperBody": "In February 2024, I interned at a copper raw materials retailer in Guangdong, China. I learned to use Microsoft Word and Excel, gained customer service experience, and developed practical cutting-machine operation skills.",
    "experience.copperAlt": "Original photo of copper raw materials stored on racks at the internship company",
    "experience.copperCaption": "My original photo of the company's copper materials racks.",
    "experience.camiiCategory": "FIELDWORK · TOKYO–YOKOHAMA",
    "experience.camiiTitle": "Tokyo Camii Visit",
    "experience.camiiDate": "September 20, 2022",
    "experience.camiiBody": "During a Tokyo–Yokohama fieldwork program organized by Toyo University, I visited Tokyo Camii in Yoyogi. Through the staff's welcoming explanations, I learned about the daily lives and culture of Muslims in Japan.",
    "experience.camiiAlt": "Original photo of the Tokyo Camii cultural center's interior, displays and Japanese and Turkish flags",
    "experience.camiiCaption": "My original photo from the Tokyo Camii visit.",
    "experience.nexusCategory": "MODDING ACHIEVEMENT · NEXUS MODS",
    "experience.nexusTitle": "Nexus Mods — Mod Author",
    "experience.nexusDate": "September 2026",
    "experience.nexusBody": "In September 2026, my mods reached 1,000 total downloads, earning me Mod Author status and an author badge on my Nexus Mods profile.",
    "experience.nexusAlt": "Nexus Mods achievement notification showing Mod Author status after reaching 1,000 mod downloads",
    "experience.nexusCaption": "Nexus Mods Mod Author achievement notification.",
    "experience.openAchievement": "View achievement screenshot ↗",
    "experience.viewMods": "View my Nexus Mods profile ↗",
    "site.backTop": "Back to top"
};
const messages = {
    en: english,
    zh: {
        "language.label": "语言选择",
        "home.title": "Hu Kai - 个人网站",
        "home.welcome": "欢迎！我目前正在学习编程和网页开发，希望能得到你的宝贵建议。",
        "home.cv": "查看我的简历",
        "home.certificates": "证书&成就",
        "cert.title": "Hu Kai - 证书&成就",
        "cert.intro": "学历、资格认证与语言考试成绩，以及大学期间的工作经历和实地考察记录。",
        "cert.languageTest": "语言考试",
        "cert.totalScore": "总分",
        "cert.listening": "听力",
        "cert.reading": "阅读",
        "cert.testDate": "考试日期",
        "cert.toeicAlt": "胡凯的 TOEIC 听力与阅读（L&R）官方成绩单：总分 800，听力 460，阅读 340",
        "cv.toeicResult": "听力 460 · 阅读 340 · 考试日期：2025 年 3 月 1 日",
        "cert.fpName": "金融规划师 3 级（FP）",
        "cert.fpIssuer": "金融财政事务研究会（KINZAI）/ 日本金融规划师协会（JAFP）",
        "cert.fpAlt": "胡凯的金融规划师 3 级（FP）合格证书",
        "cert.accountingName": "商务会计检定 3 级",
        "cert.accountingIssuer": "大阪商工会议所",
        "cert.accountingAlt": "胡凯的商务会计检定 3 级合格证书",
        "cv.fpDate": "2022 年 10 月 24 日颁发",
        "cv.accountingDate": "2022 年 10 月 16 日颁发",
        "cert.n1Name": "日本语能力测试 N1（JLPT）",
        "cert.n1Issuer": "日本国际教育支援协会 / 国际交流基金",
        "cert.n1Alt": "胡凯的 JLPT N1 合格及成绩证明书",
        "cert.result": "考试结果",
        "cert.passed": "合格",
        "cv.n1Result": "合格 · 考试日期：2021 年 12 月 5 日",
        "cert.hint": "点击截图，在证书画廊中查看大图。",
        "cert.academic": "学历证明",
        "cert.professional": "资格认证",
        "cert.degreeName": "社会学学士",
        "cert.degreeDescription": "东洋大学社会学部国际社会学科毕业证书及学位证。",
        "cert.aiName": "生成 AI Passport",
        "cert.aiIssuer": "生成 AI 活用普及协会（GUGA）",
        "cert.aiDescription": "生成 AI Passport 考试合格证书。",
        "cert.issued": "颁发日期",
        "cert.open": "查看证书大图 ↗",
        "cert.degreeAlt": "胡凯的东洋大学毕业证书与社会学学士学位证",
        "cert.aiAlt": "胡凯的 GUGA 生成 AI Passport 合格证书",
        "cert.awsAlt": "Kai Hu 的 AWS Certified Cloud Practitioner 证书",
        "cert.awsAifName": "AWS Certified AI Practitioner (AIF)",
        "cert.awsAifIssuer": "Amazon Web Services（AWS）",
        "cert.awsAifAlt": "颁发给 Kai Hu 的 AWS Certified AI Practitioner (AIF) 证书",
        "cv.qualifications": "资格证书",
        "cv.awsDates": "2026 年 9 月 23 日颁发",
        "cv.awsAifDate": "2026 年 10 月 16 日颁发",
        "cv.aiDate": "2026 年 7 月 15 日颁发",
        "cert.itPassportName": "IT Passport（ITパスポート）",
        "cert.itPassportIssuer": "日本信息处理推进机构（IPA）",
        "cert.itPassportDescription": "2026 年 6 月通过 IT Passport 考试，附考试结果报告。",
        "cert.itPassportAlt": "胡凯的 IT Passport 考试结果报告：2026 年 6 月 29 日考试，合格",
        "cv.itPassportResult": "2026 年 6 月合格 · 考试日期：2026 年 6 月 29 日",
        "cert.drivingName": "日本驾驶执照",
        "cert.drivingSchool": "西胁汽车驾驶学校",
        "cert.drivingDescription": "2026 年 1 月取得日本驾驶执照。配图为驾校毕业纪念封套照片。",
        "cert.drivingAlt": "西胁汽车驾驶学校的毕业纪念封套照片",
        "cert.obtained": "取得时间",
        "cert.openPhoto": "查看完整照片 ↗",
        "cv.drivingDate": "2026 年 1 月取得",
        "cert.openPdf": "查看原始 PDF ↗",
        "home.about": "关于我",
        "home.aboutBody": "我的专业是社会学，此前没有学习过计算机相关知识。不过，我愿意尝试新的领域。",
        "home.goal": "我的目标",
        "home.goalBody": "我的目标是独立完成一些项目。",
        "home.direction": "项目方向",
        "home.stepOne": "第一步",
        "home.stepOneBody": "也许我会先尝试制作一些简单的游戏模型。",
        "home.stepTwo": "第二步",
        "home.stepTwoBody": "巩固基础技能，提升英语写作能力。",
        "home.stepThree": "第三步",
        "home.stepThreeBody": "独立完成项目。",
        "home.information": "个人信息",
        "home.name": "姓名",
        "home.major": "专业",
        "home.majorValue": "社会学（全球多样性研究方向）",
        "home.educationValue": "社会学学士（东洋大学）",
        "home.languages": "语言能力",
        "home.languagesValue": "中文（母语）、日语（专业工作水平）、英语（中级）、西班牙语（初级）",
        "home.nationality": "国籍",
        "home.nationalityValue": "中国",
        "home.location": "所在地",
        "home.locationValue": "日本东京",
        "site.crestAlt": "胡凯的个人纹章",
        "home.copyright": "© 2026 Hu Kai. 保留所有权利。",
        "cv.title": "Hu Kai - 个人简历",
        "cv.heading": "个人简历",
        "cv.personal": "个人信息",
        "cv.name": "姓名：",
        "cv.gender": "性别：",
        "cv.genderValue": "男",
        "cv.birthDate": "出生日期：",
        "cv.nationality": "国籍：",
        "cv.nationalityValue": "中国",
        "cv.selfPR": "自我介绍",
        "cv.selfPRBody": "我积极主动，适应能力强，拥有客户服务和销售经验。目前正通过自主学习和实际项目提升 IT 技能。",
        "cv.skills": "技能",
        "cv.skillsValue": "中文、日语、英语、Python、HTML、CSS、Adobe Photoshop、Adobe Premiere Pro、SQL、Blender、AI Agent、云计算",
        "cv.stampAlt": "帝国印章",
        "cv.stampButton": "盖章",
        "cv.linkedin": "查看我的领英个人主页",
        "cv.pdfResume": "查看 PDF 履历书 ↗",
        "cv.back": "← 返回首页",
        "music.title": "帝皇圣歌",
        "education.label": "教育经历",
        "education.university": "东洋大学",
        "education.degree": "社会学学士",
        "education.graduated": "2026 年毕业",
        "nav.home": "首页",
        "nav.cv": "个人简历",
        "nav.label": "主导航",
        "site.skip": "跳到正文",
        "home.kicker": "个人档案",
        "home.subtitle": "社会学 · 云计算 · 创意技术",
        "home.profile": "现居日本东京",
        "home.explore": "查看我的证书&成就",
        "home.archive": "学习、构建、继续前进。",
        "cert.kicker": "证书与成就档案",
        "cert.all": "全部证书",
        "cert.filters": "筛选证书",
        "cert.count": "{count} 份证书",
        "viewer.close": "关闭证书",
        "viewer.previous": "上一份证书",
        "viewer.next": "下一份证书",
        "viewer.position": "{current} / {total}",
        "viewer.error": "图片暂时无法加载，可通过下方链接打开原始截图。",
        "audio.marchTitle": "星界军 · 出征集结",
        "audio.enable": "开启音效",
        "audio.disable": "关闭音效",
        "audio.mute": "静音",
        "audio.unmute": "取消静音",
        "audio.volume": "音量",
        "audio.ready": "音效已关闭 · 点击开启",
        "audio.loading": "正在准备出征音效…",
        "audio.playing": "音效播放中",
        "audio.muted": "已静音",
        "audio.unavailable": "当前浏览器暂时无法播放音效",
        "audio.description": "行军脚步、军鼓、铜管与远处引擎",
        "audio.hymnDescription": "原创管风琴合成圣歌",
        "cv.kicker": "个人履历档案",
        "art.title": "胡凯 - 艺术作品展示",
        "art.heading": "艺术作品展示",
        "art.kicker": "艺术作品 / 008",
        "art.intro": "这里展示我使用 Blender 创作的作品的实机演示效果。",
        "art.explore": "进入作品展览",
        "art.open": "查看原图 ↗",
        "art.contents": "展览目录",
        "art.menswearAlt": "游戏场景中身穿白衬衫、马甲、领带并戴鸭舌帽的人物。",
        "art.acanthusAlt": "骑士与战马身披黑金茛苕纹饰盔甲，骑士手持同风格盾牌。",
        "art.joustingAlt": "身穿带有沟槽的金属比武盔甲并持骑枪的骑士。",
        "art.heavyArmourAlt": "游戏森林场景中，一名身穿重型金属盔甲的骑士手持装饰长柄武器。",
        "art.landsknechtAlt": "游戏场景中，一名身穿亮面德意志文艺复兴盔甲与鲜艳服饰的兰兹克内希特。",
        "art.royalConquerorAlt": "游戏沙漠场景中，一名身穿黑金华丽盔甲的骑马征服者。",
        "art.wwiRaiderAlt": "游戏场景中，一名身穿深色钢制盔甲、戴着头盔和圆形护目镜的一战突击队员。",
        "art.blackLongCoatAlt": "游戏场景中，一名身穿黑色长外套、戴宽檐帽的人物。",
        "works.heading": "我的作品",
        "works.title": "Hu Kai - 我的作品",
        "works.kicker": "作品目录",
        "works.intro": "这里汇总我的 GitHub 项目、Nexus Mods 模组作品和 QuizSite 题库练习网站。",
        "works.githubCategory": "源码与项目",
        "works.githubDescription": "浏览我的 GitHub 仓库、源码与项目更新。",
        "works.modsCategory": "游戏模组",
        "works.modsDescription": "浏览我的 Nexus Mods 主页与模组作品。",
        "works.quizCategory": "题库与练习",
        "works.quizDescription": "打开我的 QuizSite 网站，进行题库练习与复习。",
        "cert.toeicSwName": "TOEIC 口语与写作（S&W）",
        "cert.speaking": "口语",
        "cert.writing": "写作",
        "cert.toeicSwAlt": "胡凯的 TOEIC 口语与写作官方成绩单：口语 120 / 200，写作 130 / 200",
        "cv.toeicSwResult": "口语 120 / 200 · 写作 130 / 200 · 考试日期：2026 年 9 月 13 日",
        "cert.toeicLrName": "TOEIC 听力与阅读（L&R）",
        "cert.toeicLrType": "听力与阅读（L&R）",
        "cert.archiveHeading": "证书",
        "experience.heading": "经历与成就",
        "experience.hotelCategory": "工作经历 · 大学期间",
        "experience.hotelTitle": "酒店宴会服务与餐馆助手",
        "experience.hotelStart": "2022 年 4 月",
        "experience.hotelEnd": "2025 年 8 月",
        "experience.until": "至",
        "experience.hotelBody": "2022 年 4 月至 2025 年 8 月，大学期间从事酒店（Hotel）的宴会服务（BanquetService）以及餐馆助手（Busboy）工作。",
        "experience.hotelAlt": "胡凯身穿酒店服务制服的照片",
        "experience.hotelCaption": "大学期间酒店工作的照片。",
        "experience.openPhoto": "查看原始照片 ↗",
        "experience.studyCategory": "实地考察 · 巴布亚新几内亚",
        "experience.studyTitle": "巴布亚新几内亚 Study Tour",
        "experience.studyDate": "2023 年 9 月",
        "experience.studyBody": "2023 年 9 月，参加巴布亚新几内亚实地考察（Study Tour）项目，并与组员们一同探访 JICA（日本国际协力机构／国際協力機構），进行学习交流。",
        "experience.studyAlt": "Study Tour 组员探访 JICA 时的合照",
        "experience.studyCaption": "与 Study Tour 组员一同在 JICA 学习交流的合照。",
        "experience.copperCategory": "实习经历 · 中国广东",
        "experience.copperTitle": "红铜原材料零售公司实习",
        "experience.copperDate": "2024 年 2 月",
        "experience.copperBody": "2024 年 2 月，在中国广东省的一家红铜原材料零售公司实习，学习 Microsoft Word、Excel 的使用，积累客户沟通与服务经验，并掌握切割机的操作技巧。",
        "experience.copperAlt": "本人拍摄的实习公司红铜原材料货架照片",
        "experience.copperCaption": "本人拍摄的红铜原材料货架现场照片。",
        "experience.camiiCategory": "实地演习 · 东京—横滨",
        "experience.camiiTitle": "Tokyo Camii 清真寺参访",
        "experience.camiiDate": "2022 年 9 月 20 日",
        "experience.camiiBody": "参加东洋大学组织的东京—横滨实地演习时，访问了位于代代木的 Tokyo Camii 清真寺。在寺内工作人员的热心讲解下，了解了在日穆斯林的生活与文化。",
        "experience.camiiAlt": "本人拍摄的 Tokyo Camii 文化中心室内展示及日本、土耳其国旗照片",
        "experience.camiiCaption": "本人拍摄的 Tokyo Camii 参访现场照片。",
        "experience.nexusCategory": "模组创作成就 · NEXUS MODS",
        "experience.nexusTitle": "Nexus Mods — Mod Author 作者身份",
        "experience.nexusDate": "2026 年 9 月",
        "experience.nexusBody": "2026 年 9 月，模组累计下载量达到 1,000 次，获得 Nexus Mods 平台的 Mod Author 作者身份及个人资料作者徽章。",
        "experience.nexusAlt": "Nexus Mods 成就通知截图：模组下载量达到 1,000 次后获得 Mod Author 作者身份",
        "experience.nexusCaption": "Nexus Mods 的 Mod Author 作者成就通知截图。",
        "experience.openAchievement": "查看成就截图 ↗",
        "experience.viewMods": "查看我的 Nexus Mods 主页 ↗",
        "site.backTop": "返回顶部"
    },
    ja: {
        "language.label": "言語選択",
        "home.title": "Hu Kai - 個人サイト",
        "home.welcome": "ようこそ！現在、プログラミングと Web 開発を学んでいます。ぜひアドバイスをいただけるとうれしいです。",
        "home.cv": "履歴書を見る",
        "home.certificates": "資格・実績",
        "cert.title": "Hu Kai - 資格・実績",
        "cert.intro": "学歴・資格・語学試験の結果と、大学時代の勤務経験やスタディツアーの記録を紹介します。",
        "cert.languageTest": "語学試験",
        "cert.totalScore": "合計スコア",
        "cert.listening": "リスニング",
        "cert.reading": "リーディング",
        "cert.testDate": "受験日",
        "cert.toeicAlt": "胡凱のTOEICリスニング＆リーディング（L&R）公式認定証：合計800、リスニング460、リーディング340",
        "cv.toeicResult": "リスニング460 · リーディング340 · 受験日：2025年3月1日",
        "cert.fpName": "3級ファイナンシャル・プランニング技能士",
        "cert.fpIssuer": "金融財政事情研究会 / 日本ファイナンシャル・プランナーズ協会",
        "cert.fpAlt": "胡凱の3級ファイナンシャル・プランニング技能検定合格証書",
        "cert.accountingName": "ビジネス会計検定試験 3級",
        "cert.accountingIssuer": "大阪商工会議所",
        "cert.accountingAlt": "胡凱のビジネス会計検定試験3級合格証書",
        "cv.fpDate": "2022年10月24日取得",
        "cv.accountingDate": "2022年10月16日取得",
        "cert.n1Name": "日本語能力試験 N1（JLPT）",
        "cert.n1Issuer": "日本国際教育支援協会 / 国際交流基金",
        "cert.n1Alt": "胡凱のJLPT N1認定結果及び成績に関する証明書、合格",
        "cert.result": "結果",
        "cert.passed": "合格",
        "cv.n1Result": "合格 · 受験日：2021年12月5日",
        "cert.hint": "画像をクリックすると、証書ビューアーで拡大できます。",
        "cert.academic": "学歴",
        "cert.professional": "資格",
        "cert.degreeName": "学士（社会学）",
        "cert.degreeDescription": "東洋大学社会学部国際社会学科の卒業証書・学位記。",
        "cert.aiName": "生成AIパスポート",
        "cert.aiIssuer": "生成AI活用普及協会（GUGA）",
        "cert.aiDescription": "生成AIパスポート試験の合格証書。",
        "cert.issued": "発行日",
        "cert.open": "証書の画像を拡大 ↗",
        "cert.degreeAlt": "胡凱の東洋大学卒業証書・学士（社会学）の学位記",
        "cert.aiAlt": "胡凱のGUGA生成AIパスポート合格証書",
        "cert.awsAlt": "Kai HuのAWS Certified Cloud Practitioner認定証",
        "cert.awsAifName": "AWS Certified AI Practitioner (AIF)",
        "cert.awsAifIssuer": "Amazon Web Services（AWS）",
        "cert.awsAifAlt": "Kai Huに発行されたAWS Certified AI Practitioner (AIF)認定証",
        "cv.qualifications": "資格",
        "cv.awsDates": "2026年9月23日取得",
        "cv.awsAifDate": "2026年10月16日取得",
        "cv.aiDate": "2026年7月15日取得",
        "cert.itPassportName": "ITパスポート試験",
        "cert.itPassportIssuer": "独立行政法人情報処理推進機構（IPA）",
        "cert.itPassportDescription": "2026 年 6 月合格。試験結果レポートを添付。",
        "cert.itPassportAlt": "胡凱のITパスポート試験結果レポート：2026年6月29日受験、合格",
        "cv.itPassportResult": "2026 年 6 月合格 · 受験日：2026 年 6 月 29 日",
        "cert.drivingName": "日本の自動車運転免許",
        "cert.drivingSchool": "西脇自動車教習所",
        "cert.drivingDescription": "2026年1月、日本の自動車運転免許を取得。写真は教習所の卒業記念の証書ケース。",
        "cert.drivingAlt": "西脇自動車教習所の卒業記念の証書ケースの写真",
        "cert.obtained": "取得年月",
        "cert.openPhoto": "写真を原寸で見る ↗",
        "cv.drivingDate": "2026年1月取得",
        "cert.openPdf": "元の PDF を見る ↗",
        "home.about": "私について",
        "home.aboutBody": "社会学を専攻しており、これまでコンピューターに関する分野を学んだことはありませんでした。それでも、新しい分野に挑戦したいと考えています。",
        "home.goal": "目標",
        "home.goalBody": "自分の力でプロジェクトを完成させることが目標です。",
        "home.direction": "プロジェクトの方向性",
        "home.stepOne": "ステップ 1",
        "home.stepOneBody": "最初の挑戦として、簡単なゲーム用モデルを制作してみたいと考えています。",
        "home.stepTwo": "ステップ 2",
        "home.stepTwoBody": "基礎スキルを固め、英語のライティング力を高めます。",
        "home.stepThree": "ステップ 3",
        "home.stepThreeBody": "独力でプロジェクトを完成させます。",
        "home.information": "プロフィール",
        "home.name": "氏名",
        "home.major": "専攻",
        "home.majorValue": "社会学（グローバル・ダイバーシティ研究）",
        "home.educationValue": "社会学学士（東洋大学）",
        "home.languages": "語学力",
        "home.languagesValue": "中国語（母語）、日本語（ビジネスレベル）、英語（中級）、スペイン語（初級）",
        "home.nationality": "国籍",
        "home.nationalityValue": "中国",
        "home.location": "所在地",
        "home.locationValue": "日本・東京",
        "site.crestAlt": "胡凯の個人紋章",
        "home.copyright": "© 2026 Hu Kai. 無断転載を禁じます。",
        "cv.title": "Hu Kai - 履歴書",
        "cv.heading": "履歴書",
        "cv.personal": "基本情報",
        "cv.name": "氏名：",
        "cv.gender": "性別：",
        "cv.genderValue": "男性",
        "cv.birthDate": "生年月日：",
        "cv.nationality": "国籍：",
        "cv.nationalityValue": "中国",
        "cv.selfPR": "自己 PR",
        "cv.selfPRBody": "私は意欲的で適応力があり、接客と営業の経験があります。現在は独学と実践的なプロジェクトを通して、IT スキルの向上に取り組んでいます。",
        "cv.skills": "スキル",
        "cv.skillsValue": "中国語、日本語、英語、Python、HTML、CSS、Adobe Photoshop、Adobe Premiere Pro、SQL、Blender、AI Agent、クラウド",
        "cv.stampAlt": "帝国の印章",
        "cv.stampButton": "押印",
        "cv.linkedin": "LinkedInプロフィールを見る",
        "cv.pdfResume": "PDF 履歴書を見る ↗",
        "cv.back": "← ホームに戻る",
        "music.title": "帝皇の聖歌",
        "education.label": "学歴",
        "education.university": "東洋大学",
        "education.degree": "社会学学士",
        "education.graduated": "2026 年卒業",
        "nav.home": "ホーム",
        "nav.cv": "履歴書",
        "nav.label": "メインナビゲーション",
        "site.skip": "本文へ移動",
        "home.kicker": "個人アーカイブ",
        "home.subtitle": "社会学 · クラウド · クリエイティブ技術",
        "home.profile": "日本・東京在住",
        "home.explore": "資格と実績を見る",
        "home.archive": "学び、作り、前へ進む。",
        "cert.kicker": "資格・実績アーカイブ",
        "cert.all": "すべての証書",
        "cert.filters": "資格を絞り込む",
        "cert.count": "{count} 件の証書",
        "viewer.close": "証書を閉じる",
        "viewer.previous": "前の証書",
        "viewer.next": "次の証書",
        "viewer.position": "{current} / {total}",
        "viewer.error": "画像を読み込めません。下のリンクから元の画像を開けます。",
        "audio.marchTitle": "アストラ・ミリタルム — 出征",
        "audio.enable": "音響をオン",
        "audio.disable": "音響をオフ",
        "audio.mute": "ミュート",
        "audio.unmute": "ミュート解除",
        "audio.volume": "音量",
        "audio.ready": "音響オフ · クリックで開始",
        "audio.loading": "出征の音響を準備中…",
        "audio.playing": "再生中",
        "audio.muted": "ミュート中",
        "audio.unavailable": "このブラウザーでは音響を再生できません",
        "audio.description": "行軍の足音、軍鼓、金管と遠くのエンジン",
        "audio.hymnDescription": "オリジナルの合成パイプオルガン聖歌",
        "cv.kicker": "個人履歴アーカイブ",
        "art.title": "胡凱 - アート作品展示",
        "art.heading": "アート作品展示",
        "art.kicker": "アート作品 / 008",
        "art.intro": "Blenderで制作した作品の実機デモンストレーションです。",
        "art.explore": "作品展示を見る",
        "art.open": "元の画像を見る ↗",
        "art.contents": "展示目次",
        "art.menswearAlt": "ゲーム内でハンチング帽、白いシャツ、ベスト、ネクタイを着用した人物。",
        "art.acanthusAlt": "黒と金のアカンサス模様の甲冑と盾を装備した騎士と、同じ装飾の馬鎧。",
        "art.joustingAlt": "溝のある金属製の馬上槍試合用甲冑を装備し、槍を持つ騎士。",
        "art.heavyArmourAlt": "ゲーム内の森で、重厚な金属製甲冑を着用し、装飾された長柄武器を持つ騎士。",
        "art.landsknechtAlt": "ゲーム内で、光沢のあるドイツ・ルネサンス期風の甲冑と色鮮やかな服を着たランツクネヒト。",
        "art.royalConquerorAlt": "ゲーム内の砂漠で、黒と金の華麗な甲冑をまとって馬に乗る征服者。",
        "art.wwiRaiderAlt": "ゲーム内で、濃色の鋼鉄製甲冑とヘルメット、丸いゴーグルを身に着けた第一次世界大戦の突撃兵。",
        "art.blackLongCoatAlt": "ゲーム内の砂漠で、黒いコートとつばの広い帽子を着用した人物。",
        "works.heading": "私の作品",
        "works.title": "Hu Kai - 私の作品",
        "works.kicker": "作品ディレクトリ",
        "works.intro": "GitHubのプロジェクト、Nexus ModsのゲームMOD、QuizSiteの問題練習サイトをまとめています。",
        "works.githubCategory": "ソースコード・プロジェクト",
        "works.githubDescription": "GitHubのリポジトリ、ソースコード、プロジェクトの更新をご覧いただけます。",
        "works.modsCategory": "ゲームMOD",
        "works.modsDescription": "Nexus ModsのプロフィールとゲームMODをご覧いただけます。",
        "works.quizCategory": "問題集・練習",
        "works.quizDescription": "QuizSiteで問題練習と復習ができます。",
        "cert.toeicSwName": "TOEIC スピーキング＆ライティング（S&W）",
        "cert.speaking": "スピーキング",
        "cert.writing": "ライティング",
        "cert.toeicSwAlt": "胡凱のTOEIC Speaking & Writing公式認定証：スピーキング120 / 200、ライティング130 / 200",
        "cv.toeicSwResult": "スピーキング120 / 200 · ライティング130 / 200 · 受験日：2026年9月13日",
        "cert.toeicLrName": "TOEIC リスニング＆リーディング（L&R）",
        "cert.toeicLrType": "リスニング＆リーディング（L&R）",
        "cert.archiveHeading": "証書",
        "experience.heading": "経験・実績",
        "experience.hotelCategory": "勤務経験 · 大学時代",
        "experience.hotelTitle": "ホテル宴会サービス・レストラン補助",
        "experience.hotelStart": "2022 年 4 月",
        "experience.hotelEnd": "2025 年 8 月",
        "experience.until": "から",
        "experience.hotelBody": "2022 年 4 月から 2025 年 8 月まで、大学在学中にホテルの宴会サービス（BanquetService）およびレストラン補助（Busboy）の仕事に従事しました。",
        "experience.hotelAlt": "ホテルのサービス制服を着た胡凱の写真",
        "experience.hotelCaption": "大学時代のホテル勤務の写真。",
        "experience.openPhoto": "元の写真を見る ↗",
        "experience.studyCategory": "スタディツアー · パプアニューギニア",
        "experience.studyTitle": "パプアニューギニア・スタディツアー",
        "experience.studyDate": "2023 年 9 月",
        "experience.studyBody": "2023 年 9 月、パプアニューギニアでの実地研修（Study Tour）に参加し、グループのメンバーとともに JICA（国際協力機構）を訪問して、学習・交流を行いました。",
        "experience.studyAlt": "スタディツアーのJICA訪問時の集合写真",
        "experience.studyCaption": "スタディツアーのメンバーとJICAで学習・交流。",
        "experience.copperCategory": "インターンシップ · 中国・広東省",
        "experience.copperTitle": "銅素材小売企業でのインターンシップ",
        "experience.copperDate": "2024 年 2 月",
        "experience.copperBody": "2024 年 2 月、中国・広東省の銅素材を扱う小売企業でインターンシップに参加しました。Microsoft Word・Excel の使い方を学び、顧客対応の経験を積むとともに、切断機の操作技術を習得しました。",
        "experience.copperAlt": "本人が撮影した実習先の銅素材保管棚の写真",
        "experience.copperCaption": "本人が撮影した銅素材保管棚の現地写真。",
        "experience.camiiCategory": "フィールドワーク · 東京・横浜",
        "experience.camiiTitle": "東京ジャーミイ訪問",
        "experience.camiiDate": "2022 年 9 月 20 日",
        "experience.camiiBody": "東洋大学が主催する東京・横浜のフィールドワークに参加し、代々木の東京ジャーミイを訪問しました。施設スタッフの丁寧な説明を通じて、日本で暮らすムスリムの生活や文化について学びました。",
        "experience.camiiAlt": "本人が撮影した東京ジャーミイ文化センターの展示と日本・トルコの国旗の写真",
        "experience.camiiCaption": "本人が撮影した東京ジャーミイ訪問時の現地写真。",
        "experience.nexusCategory": "MOD 制作の実績 · NEXUS MODS",
        "experience.nexusTitle": "Nexus Mods — Mod Author 認定",
        "experience.nexusDate": "2026 年 9 月",
        "experience.nexusBody": "2026 年 9 月、制作した MOD の累計ダウンロード数が 1,000 件に達し、Nexus Mods で Mod Author ステータスとプロフィールの作者バッジを獲得しました。",
        "experience.nexusAlt": "MOD のダウンロード数が 1,000 件に達して Mod Author ステータスを獲得した Nexus Mods の通知画面",
        "experience.nexusCaption": "Nexus Mods の Mod Author 実績通知のスクリーンショット。",
        "experience.openAchievement": "実績のスクリーンショットを見る ↗",
        "experience.viewMods": "Nexus Mods のプロフィールを見る ↗",
        "site.backTop": "ページの先頭へ"
    }
};
// #endregion

// #region 02 浏览器偏好设置
function readPreference(key, fallback) {
    try {
        return localStorage.getItem(key) ?? fallback;
    }
    catch {
        return fallback;
    }
}
function savePreference(key, value) {
    try {
        localStorage.setItem(key, value);
    }
    catch {
        // Controls still work in this document when storage is blocked.
        document.documentElement.dataset.storage = "unavailable";
    }
}
// #endregion

// #region 03 音频通用工具
function audioContextClass() {
    const browser = window;
    return browser.AudioContext ?? browser.webkitAudioContext;
}
function offlineContextClass() {
    const browser = window;
    const Context = browser.OfflineAudioContext ?? browser.webkitOfflineAudioContext;
    if (!Context)
        throw new Error("Offline audio synthesis is unavailable.");
    return Context;
}
function normalizeBuffer(buffer, fadeSeconds = 0.3) {
    let peak = 0;
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        for (const value of buffer.getChannelData(channel))
            peak = Math.max(peak, Math.abs(value));
    }
    const scale = peak > 0 ? 0.8 / peak : 1;
    const fadeLength = buffer.sampleRate * fadeSeconds;
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        const samples = buffer.getChannelData(channel);
        for (let index = 0; index < samples.length; index++) {
            const envelope = Math.min(1, index / fadeLength, (samples.length - 1 - index) / fadeLength);
            samples[index] = (samples[index] ?? 0) * scale * envelope;
        }
    }
    return buffer;
}
// #endregion

// #region 04 语言切换
const locale = { en: "en", zh: "zh-CN", ja: "ja" };
let language = "en";
function supported(value) {
    return value === "en" || value === "zh" || value === "ja";
}
function messageKey(value) {
    return value !== undefined && Object.hasOwn(messages.en, value);
}
function translate(key, values = {}) {
    return messages[language][key].replace(/\{(\w+)\}/g, (match, name) => String(values[name] ?? match));
}
function applyLanguage(next) {
    language = next;
    document.documentElement.lang = locale[next];
    document.querySelectorAll("[data-i18n]").forEach(element => {
        if (messageKey(element.dataset.i18n))
            element.textContent = translate(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(element => {
        if (messageKey(element.dataset.i18nAlt))
            element.alt = translate(element.dataset.i18nAlt);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(element => {
        if (messageKey(element.dataset.i18nAria))
            element.setAttribute("aria-label", translate(element.dataset.i18nAria));
    });
    document.querySelectorAll("[data-language]").forEach(button => {
        button.setAttribute("aria-pressed", String(button.dataset.language === next));
    });
    document.querySelectorAll("[data-language-link]").forEach(link => {
        const target = new URL(link.href);
        target.searchParams.set("lang", next);
        link.href = target.href;
    });
    savePreference("hukai-language", next);
    document.dispatchEvent(new Event("site:language-change"));
}
function initLanguage() {
    const requested = new URL(location.href).searchParams.get("lang");
    const saved = readPreference("hukai-language", "en");
    applyLanguage(supported(requested) ? requested : supported(saved) ? saved : "en");
    document.querySelectorAll(".language-switcher").forEach(element => { element.hidden = false; });
    document.querySelectorAll("[data-language]").forEach(button => {
        button.addEventListener("click", () => {
            const next = button.dataset.language;
            if (!next || !supported(next))
                return;
            applyLanguage(next);
            const url = new URL(location.href);
            url.searchParams.set("lang", next);
            history.replaceState(null, "", url);
        });
    });
}
// #endregion

// #region 05 页面动效
function initMotion() {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const progress = document.querySelector(".reading-progress");
    let frame = 0;
    const updateProgress = () => {
        frame = 0;
        const distance = document.documentElement.scrollHeight - innerHeight;
        const fraction = distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0;
        if (progress)
            progress.style.transform = `scaleX(${fraction})`;
    };
    const scheduleProgress = () => {
        if (!frame)
            frame = requestAnimationFrame(updateProgress);
    };
    addEventListener("scroll", scheduleProgress, { passive: true });
    addEventListener("resize", scheduleProgress, { passive: true });
    updateProgress();
    const panels = document.querySelectorAll("[data-reveal]");
    let observer;
    const showAll = () => {
        observer?.disconnect();
        panels.forEach(panel => panel.classList.add("is-visible"));
    };
    if (reduced.matches || !("IntersectionObserver" in window)) {
        showAll();
    }
    else {
        document.body.classList.add("motion-enabled");
        observer = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer?.unobserve(entry.target);
                }
            }
        }, { threshold: 0.08 });
        panels.forEach(panel => observer?.observe(panel));
    }
    reduced.addEventListener("change", event => { if (event.matches)
        showAll(); });
    document.querySelectorAll(".tilt-surface").forEach(surface => {
        let tiltFrame = 0;
        surface.addEventListener("pointermove", event => {
            if (reduced.matches || event.pointerType !== "mouse")
                return;
            cancelAnimationFrame(tiltFrame);
            const bounds = surface.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            tiltFrame = requestAnimationFrame(() => {
                surface.style.setProperty("--tilt-x", `${-y * 7}deg`);
                surface.style.setProperty("--tilt-y", `${x * 7}deg`);
            });
        });
        const resetTilt = () => {
            cancelAnimationFrame(tiltFrame);
            surface.style.setProperty("--tilt-x", "0deg");
            surface.style.setProperty("--tilt-y", "0deg");
        };
        surface.addEventListener("pointerleave", resetTilt);
        reduced.addEventListener("change", event => { if (event.matches)
            resetTilt(); });
        addEventListener("pagehide", resetTilt);
    });
    addEventListener("pagehide", () => { cancelAnimationFrame(frame); showAll(); });
    addEventListener("pageshow", scheduleProgress);
}
// #endregion

// #region 06 证书筛选与图片查看器
function initCertificates() {
    const gallery = document.querySelector(".certificate-gallery");
    const dialog = document.querySelector(".certificate-dialog");
    const image = dialog?.querySelector(".viewer-image");
    const heading = dialog?.querySelector(".viewer-title");
    const position = dialog?.querySelector(".viewer-position");
    const original = dialog?.querySelector(".viewer-original");
    const error = dialog?.querySelector(".viewer-error");
    if (!gallery || !dialog || !image || !heading || !position || !original || !error)
        return;
    createGallery({ gallery, dialog, image, heading, position, original, error });
}
function createGallery({ gallery, dialog, image, heading, position, original, error }) {
    const records = [];
    gallery.querySelectorAll(".certificate-record").forEach(element => {
        const scan = element.querySelector(".certificate-image-link img");
        const title = element.querySelector("h2");
        if (scan && title)
            records.push({ element, image: scan, heading: title });
    });
    let visible = records;
    let selected = 0;
    let trigger;
    const count = document.querySelector(".certificate-count");
    function display() {
        const record = visible[selected];
        if (!record)
            return;
        image.src = record.image.src;
        image.alt = record.image.alt;
        heading.textContent = record.heading.textContent;
        position.textContent = translate("viewer.position", { current: selected + 1, total: visible.length });
        original.href = record.image.src;
        error.hidden = true;
    }
    gallery.querySelectorAll(".certificate-image-link, .certificate-open").forEach(link => {
        link.addEventListener("click", event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== "function")
                return;
            const index = visible.findIndex(record => record.element.contains(link));
            if (index < 0)
                return;
            event.preventDefault();
            selected = index;
            trigger = link;
            display();
            dialog.showModal();
            document.body.classList.add("viewer-open");
        });
    });
    const change = (offset) => {
        if (!visible.length)
            return;
        selected = (selected + offset + visible.length) % visible.length;
        display();
    };
    dialog.querySelector(".viewer-close")?.addEventListener("click", () => dialog.close());
    dialog.querySelector(".viewer-previous")?.addEventListener("click", () => change(-1));
    dialog.querySelector(".viewer-next")?.addEventListener("click", () => change(1));
    dialog.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            change(-1);
        }
        if (event.key === "ArrowRight") {
            event.preventDefault();
            change(1);
        }
    });
    dialog.addEventListener("click", event => { if (event.target === dialog)
        dialog.close(); });
    dialog.addEventListener("close", () => { document.body.classList.remove("viewer-open"); trigger?.focus({ preventScroll: true }); });
    image.addEventListener("error", () => { error.hidden = false; });
    const filters = document.querySelector(".certificate-filters");
    filters?.querySelectorAll("[data-filter]").forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.filter;
            visible = records.filter(record => category === "all" || record.element.dataset.category === category);
            records.forEach(record => { record.element.hidden = !visible.includes(record); });
            filters.querySelectorAll("[data-filter]").forEach(filter => filter.setAttribute("aria-pressed", String(filter === button)));
            if (count)
                count.textContent = translate("cert.count", { count: visible.length });
        });
    });
    if (filters)
        filters.hidden = false;
    document.addEventListener("site:language-change", () => {
        if (count)
            count.textContent = translate("cert.count", { count: visible.length });
        if (dialog.open)
            display();
    });
    if (count)
        count.textContent = translate("cert.count", { count: records.length });
}
// #endregion

// #region 07 管风琴音乐合成
// Original twelve-bar organ hymn, composed for Hu Kai's personal website.
// The score and pipe tones are synthesized locally; no recordings are used.
async function createImperialHymn() {
    const OfflineContext = offlineContextClass();
    const beat = 60 / 66;
    const score = [
        { chord: [38, 50, 53, 57], melody: [[62, 1], [65, 1], [69, 2]] },
        { chord: [34, 50, 53, 58], melody: [[70, 1], [69, 1], [65, 2]] },
        { chord: [43, 50, 55, 58], melody: [[67, 2], [65, 1], [62, 1]] },
        { chord: [45, 52, 57, 61], melody: [[64, 1], [61, 1], [69, 2]] },
        { chord: [38, 50, 53, 57], melody: [[74, 2], [72, 1], [69, 1]] },
        { chord: [41, 48, 53, 57], melody: [[69, 1], [72, 1], [77, 2]] },
        { chord: [36, 48, 52, 55], melody: [[76, 1], [74, 1], [72, 2]] },
        { chord: [34, 50, 53, 58], melody: [[70, 2], [69, 1], [65, 1]] },
        { chord: [43, 50, 55, 58], melody: [[67, 1], [70, 1], [74, 2]] },
        { chord: [45, 52, 55, 61], melody: [[73, 2], [71, 1], [69, 1]] },
        { chord: [38, 50, 53, 57], melody: [[65, 1], [64, 1], [62, 2]] },
        { chord: [38, 50, 54, 57], melody: [[66, 1], [69, 1], [74, 2]] }
    ];
    const sampleRate = 22050;
    const duration = score.length * 4 * beat + 3;
    const context = new OfflineContext(2, Math.ceil(duration * sampleRate), sampleRate);
    const mix = context.createGain();
    const dry = context.createGain();
    dry.gain.value = 0.8;
    mix.connect(dry).connect(context.destination);
    const reverb = context.createConvolver();
    const impulse = context.createBuffer(2, Math.floor(sampleRate * 2.8), sampleRate);
    let seed = 19990124;
    for (let channel = 0; channel < 2; channel++) {
        const samples = impulse.getChannelData(channel);
        let previous = 0;
        for (let index = 0; index < samples.length; index++) {
            seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
            previous = previous * 0.55 + (seed / 4294967296 * 2 - 1) * 0.45;
            samples[index] = previous * Math.exp(-4.5 * index / samples.length);
        }
    }
    reverb.buffer = impulse;
    const wet = context.createGain();
    wet.gain.value = 0.38;
    mix.connect(reverb).connect(wet).connect(context.destination);
    const wave = context.createPeriodicWave(new Float32Array(9), new Float32Array([0, 1, 0.25, 0.1, 0.17, 0.03, 0.06, 0.01, 0.025]));
    function note(midi, start, length, volume, pan) {
        const pipe = context.createOscillator();
        pipe.setPeriodicWave(wave);
        pipe.frequency.value = 440 * 2 ** ((midi - 69) / 12);
        const envelope = context.createGain();
        envelope.gain.setValueAtTime(0, start);
        envelope.gain.linearRampToValueAtTime(volume, start + 0.12);
        envelope.gain.setValueAtTime(volume, start + length - 0.08);
        envelope.gain.exponentialRampToValueAtTime(0.0001, start + length + 0.4);
        const position = context.createStereoPanner();
        position.pan.value = pan;
        pipe.connect(envelope).connect(position).connect(mix);
        pipe.start(start);
        pipe.stop(start + length + 0.45);
    }
    score.forEach((bar, barIndex) => {
        const start = barIndex * 4 * beat;
        bar.chord.forEach((midi, voice) => {
            note(midi, start, 4 * beat, voice === 0 ? 0.09 : 0.05, (voice - 1.5) * 0.25);
        });
        let offset = 0;
        bar.melody.forEach(([midi, beats]) => {
            note(midi, start + offset * beat, beats * beat, 0.12, 0.05);
            offset += beats;
        });
    });
    const buffer = await context.startRendering();
    let peak = 0;
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        for (const value of buffer.getChannelData(channel))
            peak = Math.max(peak, Math.abs(value));
    }
    const scale = peak ? 0.85 / peak : 1;
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        const samples = buffer.getChannelData(channel);
        for (let index = 0; index < samples.length; index++) {
            const fadeIn = Math.min(1, index / (sampleRate * 0.6));
            const fadeOut = Math.min(1, (samples.length - 1 - index) / (sampleRate * 1.5));
            samples[index] = (samples[index] ?? 0) * scale * fadeIn * fadeOut;
        }
    }
    return buffer;
}
// #endregion

// #region 08 行军音效合成
// An original soundscape: marching boots, field drums, brass and engine rumble.
async function createMusterSoundscape() {
    const sampleRate = 22050;
    const beat = 60 / 96;
    const duration = 16 * 4 * beat;
    const Context = offlineContextClass();
    const context = new Context(2, Math.ceil(duration * sampleRate), sampleRate);
    const mix = context.createGain();
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.ratio.value = 3;
    mix.connect(compressor).connect(context.destination);
    const noiseBuffer = context.createBuffer(1, sampleRate, sampleRate);
    const noiseSamples = noiseBuffer.getChannelData(0);
    let seed = 401999;
    for (let i = 0; i < noiseSamples.length; i++) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        noiseSamples[i] = seed / 4294967296 * 2 - 1;
    }
    function noise(start, length, frequency, volume, pan) {
        const source = context.createBufferSource();
        source.buffer = noiseBuffer;
        const filter = context.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = frequency;
        filter.Q.value = 0.65;
        const gain = context.createGain();
        gain.gain.setValueAtTime(volume, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
        const position = context.createStereoPanner();
        position.pan.value = pan;
        source.connect(filter).connect(gain).connect(position).connect(mix);
        source.start(start, 0, length);
    }
    function thud(start, pitch, length, volume, pan) {
        const oscillator = context.createOscillator();
        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(pitch, start);
        oscillator.frequency.exponentialRampToValueAtTime(pitch * 0.4, start + length);
        const gain = context.createGain();
        gain.gain.setValueAtTime(volume, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
        const position = context.createStereoPanner();
        position.pan.value = pan;
        oscillator.connect(gain).connect(position).connect(mix);
        oscillator.start(start);
        oscillator.stop(start + length);
    }
    const brassWave = context.createPeriodicWave(new Float32Array(8), new Float32Array([0, 1, 0.6, 0.35, 0.2, 0.12, 0.07, 0.035]));
    function brass(midi, start, length, volume, pan) {
        const oscillator = context.createOscillator();
        oscillator.setPeriodicWave(brassWave);
        oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12);
        const filter = context.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(500, start);
        filter.frequency.linearRampToValueAtTime(1800, start + 0.09);
        filter.frequency.linearRampToValueAtTime(650, start + length);
        const gain = context.createGain();
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(volume, start + 0.065);
        gain.gain.setValueAtTime(volume * 0.85, start + length * 0.7);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
        const position = context.createStereoPanner();
        position.pan.value = pan;
        oscillator.connect(filter).connect(gain).connect(position).connect(mix);
        oscillator.start(start);
        oscillator.stop(start + length + 0.02);
    }
    const roots = [38, 34, 43, 45];
    const phrases = [[62, 62, 65, 69], [70, 69, 65, 62], [67, 70, 74, 72], [69, 64, 61, 69]];
    for (let bar = 0; bar < 16; bar++) {
        const start = bar * 4 * beat;
        const root = roots[bar % roots.length] ?? 38;
        for (let step = 0; step < 4; step++) {
            const time = start + step * beat;
            const pan = step % 2 ? 0.35 : -0.35;
            thud(time, 110, 0.16, 0.2, pan);
            noise(time + 0.018, 0.12, 330, 0.13, pan);
            thud(time, 75, 0.28, step % 2 === 0 ? 0.24 : 0.12, 0);
            if (step % 2 === 1) {
                noise(time, 0.18, 2200, 0.16, -0.15);
                thud(time, 180, 0.12, 0.055, -0.15);
            }
            noise(time + beat * 0.75, 0.07, 2900, 0.035, 0.2);
        }
        if (bar % 4 === 3) {
            for (let roll = 0; roll < 6; roll++)
                noise(start + 3 * beat + roll * beat / 6, 0.09, 2400, 0.09, -0.1);
        }
        if (bar >= 2) {
            brass(root + 12, start, beat * 3.7, 0.085, -0.4);
            brass(root + 19, start, beat * 3.7, 0.035, 0.4);
            const phrase = phrases[bar % phrases.length] ?? phrases[0];
            phrase?.forEach((note, offset) => brass(note, start + offset * beat, beat * 0.85, 0.08, 0.15));
        }
        if (bar % 4 === 0) {
            noise(start + 0.3, 0.7, 90, 0.22, 0.5);
            thud(start + 0.3, 52, 0.8, 0.17, 0.5);
        }
    }
    const engine = context.createOscillator();
    engine.type = "triangle";
    engine.frequency.value = 43;
    const engineGain = context.createGain();
    engineGain.gain.value = 0.045;
    engine.connect(engineGain).connect(mix);
    engine.start();
    engine.stop(duration);
    return normalizeBuffer(await context.startRendering(), 0.5);
}
// #endregion

// #region 09 音频播放器
function initAudioPlayer() {
    const panel = document.querySelector("[data-audio-track]");
    const toggle = panel?.querySelector(".audio-toggle");
    const mute = panel?.querySelector(".music-mute");
    const volumeInput = panel?.querySelector(".audio-volume");
    const status = panel?.querySelector(".audio-status");
    if (!panel || !toggle || !mute || !volumeInput || !status)
        return { isMuted: () => false };
    return createPlayer({ panel, toggle, mute, volumeInput, status });
}
function createPlayer({ panel, toggle, mute, volumeInput, status }) {
    const track = panel.dataset.audioTrack === "march" ? "march" : "hymn";
    const mutedKey = track === "hymn" ? "hukai-hymn-muted" : "hukai-march-muted";
    const volumeKey = `hukai-${track}-volume`;
    let muted = readPreference(mutedKey, "false") === "true";
    const savedVolume = Number(readPreference(volumeKey, "18"));
    let volume = Number.isFinite(savedVolume) ? Math.min(50, Math.max(0, savedVolume)) / 100 : 0.18;
    let context;
    let gain;
    let source;
    let rendering;
    let buffer;
    let wanted = false;
    let failed = false;
    volumeInput.value = String(volume * 100);
    function update() {
        const playing = Boolean(source && context?.state === "running" && wanted);
        panel.dataset.audioState = playing ? "playing" : "off";
        document.body.classList.toggle("audio-active", playing && !muted && volume > 0);
        toggle.textContent = translate(wanted ? "audio.disable" : "audio.enable");
        toggle.setAttribute("aria-pressed", String(wanted));
        mute.textContent = translate(muted ? "audio.unmute" : "audio.mute");
        mute.setAttribute("aria-pressed", String(muted));
        toggle.disabled = failed;
        mute.disabled = failed;
        volumeInput.disabled = failed;
        const state = failed ? "audio.unavailable" : wanted && !buffer ? "audio.loading" : playing ? muted ? "audio.muted" : "audio.playing" : "audio.ready";
        status.textContent = translate(state);
    }
    function fail() {
        if (context?.state === "closed" && !wanted) {
            update();
            return;
        }
        wanted = false;
        failed = true;
        source?.stop();
        source = undefined;
        if (context && context.state !== "closed")
            void context.close().catch(update);
        update();
    }
    function startIfWanted() {
        if (!wanted || !buffer || !context || !gain || context.state !== "running" || document.hidden) {
            update();
            return;
        }
        if (!source) {
            source = context.createBufferSource();
            source.buffer = buffer;
            source.loop = true;
            source.connect(gain);
            source.start();
        }
        gain.gain.setTargetAtTime(muted ? 0 : volume, context.currentTime, 0.06);
        update();
    }
    function enable() {
        try {
            const Context = audioContextClass();
            if (!Context) {
                fail();
                return;
            }
            if (!context || context.state === "closed") {
                context = new Context();
                gain = context.createGain();
                gain.gain.value = muted ? 0 : volume;
                gain.connect(context.destination);
                context.addEventListener("statechange", update);
            }
            wanted = true;
            // Resume inside the user gesture; synthesis can finish asynchronously.
            const resumed = context.resume();
            rendering ??= track === "march" ? createMusterSoundscape() : createImperialHymn();
            void Promise.all([resumed, rendering]).then(([, rendered]) => {
                buffer = rendered;
                startIfWanted();
            }).catch(fail);
            update();
        }
        catch {
            fail();
        }
    }
    function disable() {
        wanted = false;
        source?.stop();
        source?.disconnect();
        source = undefined;
        if (context?.state === "running")
            void context.suspend().then(update).catch(fail);
        update();
    }
    toggle.addEventListener("click", () => wanted ? disable() : enable());
    mute.addEventListener("click", () => {
        muted = !muted;
        savePreference(mutedKey, String(muted));
        if (context && gain)
            gain.gain.setTargetAtTime(muted ? 0 : volume, context.currentTime, 0.04);
        update();
    });
    volumeInput.addEventListener("input", () => {
        volume = Math.min(50, Math.max(0, Number(volumeInput.value))) / 100;
        savePreference(volumeKey, String(volume * 100));
        if (context && gain)
            gain.gain.setTargetAtTime(muted ? 0 : volume, context.currentTime, 0.04);
        update();
    });
    document.addEventListener("site:language-change", update);
    document.addEventListener("visibilitychange", () => {
        if (!context || context.state === "closed")
            return;
        if (document.hidden)
            void context.suspend().then(update).catch(fail);
        else if (wanted)
            void context.resume().then(startIfWanted).catch(fail);
    });
    addEventListener("pagehide", () => {
        wanted = false;
        source?.stop();
        source?.disconnect();
        source = undefined;
        update();
        if (context && context.state !== "closed")
            void context.close().catch(update);
    });
    failed = !audioContextClass();
    panel.hidden = false;
    update();
    return { isMuted: () => muted };
}
// #endregion

// #region 10 印章互动
function initStamp(audio) {
    const button = document.querySelector(".stamp-button");
    const image = document.querySelector(".stamp-image");
    if (!button || !image)
        return;
    let effectContext;
    const release = (context) => {
        if (effectContext === context)
            effectContext = undefined;
        if (context && context.state !== "closed") {
            void context.close().catch(() => { image.dataset.sound = "unavailable"; });
        }
    };
    const playImpact = () => {
        const Context = audioContextClass();
        if (!Context || audio.isMuted() || effectContext)
            return;
        let context;
        try {
            context = new Context();
            effectContext = context;
            const active = context;
            void active.resume().then(() => {
                if (active.state !== "running") {
                    release(active);
                    return;
                }
                const now = active.currentTime;
                const buffer = active.createBuffer(1, Math.ceil(active.sampleRate * 0.19), active.sampleRate);
                const samples = buffer.getChannelData(0);
                let seed = 990124;
                for (let index = 0; index < samples.length; index++) {
                    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
                    samples[index] = seed / 4294967296 * 2 - 1;
                }
                const noise = active.createBufferSource();
                noise.buffer = buffer;
                const filter = active.createBiquadFilter();
                filter.type = "lowpass";
                filter.frequency.value = 1800;
                const noiseGain = active.createGain();
                noiseGain.gain.setValueAtTime(0.24, now);
                noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
                noise.connect(filter).connect(noiseGain).connect(active.destination);
                const thud = active.createOscillator();
                thud.type = "triangle";
                thud.frequency.setValueAtTime(185, now);
                thud.frequency.exponentialRampToValueAtTime(65, now + 0.14);
                const thudGain = active.createGain();
                thudGain.gain.setValueAtTime(0.38, now);
                thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.17);
                thud.connect(thudGain).connect(active.destination);
                noise.addEventListener("ended", () => release(active), { once: true });
                noise.start(now);
                noise.stop(now + 0.19);
                thud.start(now);
                thud.stop(now + 0.18);
            }).catch(() => release(active));
        }
        catch {
            image.dataset.sound = "unavailable";
            release(context);
        }
    };
    button.addEventListener("click", () => {
        if (!image.hidden)
            return;
        const wasFocused = document.activeElement === button;
        image.hidden = false;
        button.setAttribute("aria-expanded", "true");
        button.hidden = true;
        if (wasFocused)
            image.focus({ preventScroll: true });
        if (image.animate && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
            image.animate([
                { opacity: 0, transform: "scale(1.45) rotate(-14deg)" },
                { opacity: 1, transform: "scale(0.94) rotate(-8deg)", offset: 0.65 },
                { opacity: 1, transform: "scale(1) rotate(-8deg)" }
            ], { duration: 260, easing: "ease-out" });
        }
        playImpact();
    });
    addEventListener("pagehide", () => release(effectContext));
    button.hidden = false;
}
// #endregion

// #region 11 页面初始化
initLanguage();
initCertificates();
initMotion();
const audio = initAudioPlayer();
initStamp(audio);
// #endregion
