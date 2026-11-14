/**
 * ========================================================
 * AHADETH APPLICATION SCRIPT
 * الأحاديث النبوية الشريفة - صحيح البخاري وصحيح مسلم والأربعون النووية
 * ========================================================
 */

// Embedded Books Metadata (Bukhari, Muslim, Nawawi)
const HADETH_BOOKS = {"bukhari":{"key":"bukhari","edition":"ara-bukhari","nameAr":"صحيح البخاري","authorAr":"الإمام محمد بن إسماعيل البخاري","totalHadiths":7563,"totalSections":97,"sections":[{"id":"1","titleAr":"كتاب بدء الوحي","titleEn":"Revelation","firstHadith":1,"lastHadith":7,"count":7},{"id":"2","titleAr":"كتاب الإيمان","titleEn":"Belief","firstHadith":8,"lastHadith":58,"count":51},{"id":"3","titleAr":"كتاب العلم","titleEn":"Knowledge","firstHadith":59,"lastHadith":134,"count":76},{"id":"4","titleAr":"كتاب الوضوء","titleEn":"Ablutions (Wudu')","firstHadith":135,"lastHadith":247,"count":113},{"id":"5","titleAr":"كتاب الغسل","titleEn":"Bathing (Ghusl)","firstHadith":248,"lastHadith":293,"count":46},{"id":"6","titleAr":"كتاب الحيض","titleEn":"Menstrual Periods","firstHadith":294,"lastHadith":333,"count":40},{"id":"7","titleAr":"كتاب التيمم","titleEn":"Rubbing hands and feet with dust (Tayammum)","firstHadith":334,"lastHadith":348,"count":15},{"id":"8","titleAr":"كتاب الصلاة","titleEn":"Prayers (Salat)","firstHadith":349,"lastHadith":520,"count":172},{"id":"9","titleAr":"كتاب مواقيت الصلاة","titleEn":"Times of the Prayers","firstHadith":522,"lastHadith":602,"count":81},{"id":"10","titleAr":"كتاب الأذان","titleEn":"Call to Prayers (Adhaan)","firstHadith":603,"lastHadith":875,"count":273},{"id":"11","titleAr":"كتاب الجمعة","titleEn":"Friday Prayer","firstHadith":876,"lastHadith":941,"count":66},{"id":"12","titleAr":"كتاب صلاة الخوف","titleEn":"Fear Prayer","firstHadith":942,"lastHadith":947,"count":6},{"id":"13","titleAr":"كتاب العيدين","titleEn":"The Two Festivals (Eids)","firstHadith":948,"lastHadith":989,"count":42},{"id":"14","titleAr":"كتاب الوتر","titleEn":"Witr Prayer","firstHadith":990,"lastHadith":1004,"count":15},{"id":"15","titleAr":"كتاب الاستسقاء","titleEn":"Invoking Allah for Rain (Istisqaa)","firstHadith":1005,"lastHadith":1039,"count":35},{"id":"16","titleAr":"كتاب الكسوف","titleEn":"Eclipses","firstHadith":1040,"lastHadith":1066,"count":27},{"id":"17","titleAr":"كتاب سجود القرآن","titleEn":"Prostration During Recital of Qur'an","firstHadith":1067,"lastHadith":1079,"count":13},{"id":"18","titleAr":"كتاب تقصير الصلاة","titleEn":"Shortening the Prayers (At-Taqseer)","firstHadith":1080,"lastHadith":1119,"count":40},{"id":"19","titleAr":"كتاب التهجد","titleEn":"Prayer at Night (Tahajjud)","firstHadith":1120,"lastHadith":1187,"count":68},{"id":"20","titleAr":"كتاب فضل الصلاة في مسجد مكة والمدينة","titleEn":"Virtues of Prayer at Masjid Makkah and Madinah","firstHadith":1188,"lastHadith":1197,"count":10},{"id":"21","titleAr":"كتاب العمل في الصلاة","titleEn":"Actions while Praying","firstHadith":1198,"lastHadith":1223,"count":26},{"id":"22","titleAr":"كتاب السهو","titleEn":"Forgetfulness in Prayer","firstHadith":1224,"lastHadith":1236,"count":13},{"id":"23","titleAr":"كتاب الجنائز","titleEn":"Funerals (Al-Janaa'iz)","firstHadith":1237,"lastHadith":1394,"count":158},{"id":"24","titleAr":"كتاب الزكاة","titleEn":"Obligatory Charity Tax (Zakat)","firstHadith":1395,"lastHadith":1512,"count":118},{"id":"25","titleAr":"كتاب الحج","titleEn":"Hajj (Pilgrimage)","firstHadith":1513,"lastHadith":1772,"count":260},{"id":"26","titleAr":"كتاب العمرة","titleEn":"`Umrah (Minor pilgrimage)","firstHadith":1773,"lastHadith":1805,"count":33},{"id":"27","titleAr":"كتاب المحصر","titleEn":"Pilgrims Prevented from Completing the Pilgrimage","firstHadith":1806,"lastHadith":1820,"count":15},{"id":"28","titleAr":"كتاب جزاء الصيد","titleEn":"Penalty of Hunting while on Pilgrimage","firstHadith":1821,"lastHadith":1866,"count":46},{"id":"29","titleAr":"كتاب فضائل المدينة","titleEn":"Virtues of Madinah","firstHadith":1867,"lastHadith":1890,"count":24},{"id":"30","titleAr":"كتاب الصوم","titleEn":"Fasting","firstHadith":1891,"lastHadith":2007,"count":117},{"id":"31","titleAr":"كتاب صلاة التراويح","titleEn":"Praying at Night in Ramadaan (Taraweeh)","firstHadith":2008,"lastHadith":2013,"count":6},{"id":"32","titleAr":"كتاب فضل ليلة القدر","titleEn":"Virtues of the Night of Qadr","firstHadith":2014,"lastHadith":2024,"count":11},{"id":"33","titleAr":"كتاب الاعتكاف","titleEn":"Retiring to a Mosque for Remembrance of Allah (I'tikaf)","firstHadith":2025,"lastHadith":2046,"count":22},{"id":"34","titleAr":"كتاب البيوع","titleEn":"Sales and Trade","firstHadith":2047,"lastHadith":2238,"count":192},{"id":"35","titleAr":"كتاب السلم","titleEn":"Sales in which a Price is paid for Goods to be Delivered Later (As-Salam)","firstHadith":2239,"lastHadith":2256,"count":18},{"id":"36","titleAr":"كتاب الشفعة","titleEn":"Shuf'a","firstHadith":2257,"lastHadith":2259,"count":3},{"id":"37","titleAr":"كتاب الإجارة","titleEn":"Hiring","firstHadith":2260,"lastHadith":2286,"count":27},{"id":"38","titleAr":"كتاب الحوالة","titleEn":"Transferance of a Debt from One Person to Another (Al-Hawaala)","firstHadith":2287,"lastHadith":2289,"count":3},{"id":"39","titleAr":"كتاب الكفالة","titleEn":"Kafalah","firstHadith":2290,"lastHadith":2298,"count":9},{"id":"40","titleAr":"كتاب الوكالة","titleEn":"Representation, Authorization, Business by Proxy","firstHadith":2299,"lastHadith":2319,"count":21},{"id":"41","titleAr":"كتاب المزارعة","titleEn":"Agriculture","firstHadith":2320,"lastHadith":2350,"count":31},{"id":"42","titleAr":"كتاب المساقاة","titleEn":"Distribution of Water","firstHadith":2351,"lastHadith":2383,"count":33},{"id":"43","titleAr":"كتاب الاستقراض","titleEn":"Loans, Payment of Loans, Freezing of Property, Bankruptcy","firstHadith":2385,"lastHadith":2409,"count":25},{"id":"44","titleAr":"كتاب الخصومات","titleEn":"Khusoomaat","firstHadith":2410,"lastHadith":2425,"count":16},{"id":"45","titleAr":"كتاب اللقطة","titleEn":"Lost Things Picked up by Someone (Luqatah)","firstHadith":2426,"lastHadith":2439,"count":14},{"id":"46","titleAr":"كتاب المظالم","titleEn":"Oppressions","firstHadith":2440,"lastHadith":2482,"count":43},{"id":"47","titleAr":"كتاب الشركة","titleEn":"Partnership","firstHadith":2483,"lastHadith":2507,"count":25},{"id":"48","titleAr":"كتاب الرهن","titleEn":"Mortgaging","firstHadith":2508,"lastHadith":2515,"count":8},{"id":"49","titleAr":"كتاب العتق","titleEn":"Manumission of Slaves","firstHadith":2517,"lastHadith":2559,"count":43},{"id":"50","titleAr":"كتاب المكاتب","titleEn":"Makaatib","firstHadith":2560,"lastHadith":2565,"count":6},{"id":"51","titleAr":"كتاب الهبة","titleEn":"Gifts","firstHadith":2566,"lastHadith":2636,"count":71},{"id":"52","titleAr":"كتاب الشهادات","titleEn":"Witnesses","firstHadith":2637,"lastHadith":2689,"count":53},{"id":"53","titleAr":"كتاب الصلح","titleEn":"Peacemaking","firstHadith":2690,"lastHadith":2710,"count":21},{"id":"54","titleAr":"كتاب الشروط","titleEn":"Conditions","firstHadith":2712,"lastHadith":2737,"count":26},{"id":"55","titleAr":"كتاب الوصايا","titleEn":"Wills and Testaments (Wasaayaa)","firstHadith":2738,"lastHadith":2781,"count":44},{"id":"56","titleAr":"كتاب الجهاد والسير","titleEn":"Fighting for the Cause of Allah (Jihaad)","firstHadith":2782,"lastHadith":3090,"count":309},{"id":"57","titleAr":"كتاب فرض الخمس","titleEn":"One-fifth of Booty to the Cause of Allah (Khumus)","firstHadith":3091,"lastHadith":3155,"count":65},{"id":"58","titleAr":"كتاب الجزية والموادعة","titleEn":"Jizyah and Mawaada'ah","firstHadith":3157,"lastHadith":3189,"count":33},{"id":"59","titleAr":"كتاب بدء الخلق","titleEn":"Beginning of Creation","firstHadith":3190,"lastHadith":3325,"count":136},{"id":"60","titleAr":"كتاب أحاديث الأنبياء","titleEn":"Prophets","firstHadith":3326,"lastHadith":3488,"count":163},{"id":"61","titleAr":"كتاب المناقب","titleEn":"Virtues and Merits of the Prophet (pbuh) and his Companions","firstHadith":3489,"lastHadith":3648,"count":160},{"id":"62","titleAr":"كتاب فضائل أصحاب النبي","titleEn":"Companions of the Prophet","firstHadith":3649,"lastHadith":3775,"count":127},{"id":"63","titleAr":"كتاب مناقب الأنصار","titleEn":"Merits of the Helpers in Madinah (Ansaar)","firstHadith":3776,"lastHadith":3948,"count":173},{"id":"64","titleAr":"كتاب المغازي","titleEn":"Military Expeditions led by the Prophet (pbuh) (Al-Maghaazi)","firstHadith":3949,"lastHadith":4473,"count":525},{"id":"65","titleAr":"كتاب تفسير القرآن","titleEn":"Prophetic Commentary on the Qur'an (Tafseer of the Prophet (pbuh))","firstHadith":4474,"lastHadith":4977,"count":504},{"id":"66","titleAr":"كتاب فضائل القرآن","titleEn":"Virtues of the Qur'an","firstHadith":4979,"lastHadith":5062,"count":84},{"id":"67","titleAr":"كتاب النكاح","titleEn":"Wedlock, Marriage (Nikaah)","firstHadith":5063,"lastHadith":5250,"count":188},{"id":"68","titleAr":"كتاب الطلاق","titleEn":"Divorce","firstHadith":5251,"lastHadith":5350,"count":100},{"id":"69","titleAr":"كتاب النفقات","titleEn":"Supporting the Family","firstHadith":5351,"lastHadith":5372,"count":22},{"id":"70","titleAr":"كتاب الأطعمة","titleEn":"Food, Meals","firstHadith":5373,"lastHadith":5466,"count":94},{"id":"71","titleAr":"كتاب العقيقة","titleEn":"Sacrifice on Occasion of Birth (`Aqiqa)","firstHadith":5467,"lastHadith":5474,"count":8},{"id":"72","titleAr":"كتاب الذبائح والصيد","titleEn":"Hunting, Slaughtering","firstHadith":5475,"lastHadith":5544,"count":70},{"id":"73","titleAr":"كتاب الأضاحي","titleEn":"Al-Adha Festival Sacrifice (Adaahi)","firstHadith":5545,"lastHadith":5574,"count":30},{"id":"74","titleAr":"كتاب الأشربة","titleEn":"Drinks","firstHadith":5575,"lastHadith":5639,"count":65},{"id":"75","titleAr":"كتاب المرضى","titleEn":"Patients","firstHadith":5640,"lastHadith":5677,"count":38},{"id":"76","titleAr":"كتاب الطب","titleEn":"Medicine","firstHadith":5678,"lastHadith":5782,"count":105},{"id":"77","titleAr":"كتاب اللباس","titleEn":"Dress","firstHadith":5783,"lastHadith":5969,"count":187},{"id":"78","titleAr":"كتاب الأدب","titleEn":"Good Manners and Form (Al-Adab)","firstHadith":5970,"lastHadith":6226,"count":257},{"id":"79","titleAr":"كتاب الاستئذان","titleEn":"Asking Permission","firstHadith":6227,"lastHadith":6303,"count":77},{"id":"80","titleAr":"كتاب الدعوات","titleEn":"Invocations","firstHadith":6304,"lastHadith":6411,"count":108},{"id":"81","titleAr":"كتاب الرقاق","titleEn":"To make the Heart Tender (Ar-Riqaq)","firstHadith":6412,"lastHadith":6593,"count":182},{"id":"82","titleAr":"كتاب القدر","titleEn":"Divine Will (Al-Qadar)","firstHadith":6594,"lastHadith":6620,"count":27},{"id":"83","titleAr":"كتاب الأيمان والنذور","titleEn":"Oaths and Vows","firstHadith":6621,"lastHadith":6707,"count":87},{"id":"84","titleAr":"كتاب كفارات الأيمان","titleEn":"Expiation for Unfulfilled Oaths","firstHadith":6708,"lastHadith":6722,"count":15},{"id":"85","titleAr":"كتاب الفرائض","titleEn":"Laws of Inheritance (Al-Faraa'id)","firstHadith":6723,"lastHadith":6771,"count":49},{"id":"86","titleAr":"كتاب الحدود","titleEn":"Limits and Punishments set by Allah (Hudood)","firstHadith":6772,"lastHadith":6860,"count":89},{"id":"87","titleAr":"كتاب الديات","titleEn":"Blood Money (Ad-Diyat)","firstHadith":6861,"lastHadith":6917,"count":57},{"id":"88","titleAr":"كتاب استتابة المرتدين","titleEn":"Apostates","firstHadith":6918,"lastHadith":6939,"count":22},{"id":"89","titleAr":"كتاب الإكراه","titleEn":"(Statements made under) Coercion","firstHadith":6940,"lastHadith":6952,"count":13},{"id":"90","titleAr":"كتاب الحيل","titleEn":"Tricks","firstHadith":6953,"lastHadith":6981,"count":29},{"id":"91","titleAr":"كتاب التعبير","titleEn":"Interpretation of Dreams","firstHadith":6982,"lastHadith":7047,"count":66},{"id":"92","titleAr":"كتاب الفتن","titleEn":"Afflictions and the End of the World","firstHadith":7048,"lastHadith":7136,"count":89},{"id":"93","titleAr":"كتاب الأحكام","titleEn":"Judgments (Ahkaam)","firstHadith":7137,"lastHadith":7225,"count":89},{"id":"94","titleAr":"كتاب التمني","titleEn":"Wishes","firstHadith":7226,"lastHadith":7245,"count":20},{"id":"95","titleAr":"كتاب أخبار الآحاد","titleEn":"Accepting Information Given by a Truthful Person","firstHadith":7246,"lastHadith":7267,"count":22},{"id":"96","titleAr":"كتاب الاعتصام بالكتاب والسنة","titleEn":"Holding Fast to the Qur'an and Sunnah","firstHadith":7268,"lastHadith":7370,"count":103},{"id":"97","titleAr":"كتاب التوحيد","titleEn":"Oneness, Uniqueness of Allah (Tawheed)","firstHadith":7371,"lastHadith":7563,"count":193}]},"muslim":{"key":"muslim","edition":"ara-muslim","nameAr":"صحيح مسلم","authorAr":"الإمام مسلم بن الحجاج النيسابوري","totalHadiths":7500,"totalSections":57,"sections":[{"id":"0","titleAr":"مقدمة الإمام مسلم","titleEn":"Introduction","firstHadith":1,"lastHadith":92,"count":92},{"id":"1","titleAr":"كتاب الإيمان","titleEn":"The Book of Faith","firstHadith":93,"lastHadith":533,"count":441},{"id":"2","titleAr":"كتاب الطهارة","titleEn":"The Book of Purification","firstHadith":534,"lastHadith":678,"count":145},{"id":"3","titleAr":"كتاب الحيض","titleEn":"The Book of Menstruation","firstHadith":679,"lastHadith":836,"count":158},{"id":"4","titleAr":"كتاب الصلاة","titleEn":"The Book of Prayers ","firstHadith":837,"lastHadith":1160,"count":324},{"id":"5","titleAr":"كتاب المساجد ومواضع الصلاة","titleEn":"The Book of Mosques and Places of Prayer","firstHadith":1161,"lastHadith":1569,"count":409},{"id":"6","titleAr":"كتاب صلاة المسافرين وقصرها","titleEn":"The Book of Prayer - Travellers","firstHadith":1570,"lastHadith":1950,"count":381},{"id":"7","titleAr":"كتاب الجمعة","titleEn":"The Book of Prayer - Friday","firstHadith":1951,"lastHadith":2043,"count":93},{"id":"8","titleAr":"كتاب صلاة العيدين","titleEn":"The Book of Prayer - Two Eids","firstHadith":2044,"lastHadith":2069,"count":26},{"id":"9","titleAr":"كتاب صلاة الاستسقاء","titleEn":"The Book of Prayer - Rain","firstHadith":2070,"lastHadith":2088,"count":19},{"id":"10","titleAr":"كتاب صلاة الكسوف","titleEn":"The Book of Prayer - Eclipses","firstHadith":2089,"lastHadith":2122,"count":34},{"id":"11","titleAr":"كتاب الجنائز","titleEn":"The Book of Prayer - Funerals","firstHadith":2123,"lastHadith":2262,"count":140},{"id":"12","titleAr":"كتاب الزكاة","titleEn":"The Book of Zakat","firstHadith":2263,"lastHadith":2494,"count":232},{"id":"13","titleAr":"كتاب الصيام","titleEn":"The Book of Fasting ","firstHadith":2495,"lastHadith":2779,"count":285},{"id":"14","titleAr":"كتاب الاعتكاف","titleEn":"The Book of I'tikaf","firstHadith":2780,"lastHadith":2790,"count":11},{"id":"15","titleAr":"كتاب الحج","titleEn":"The Book of Pilgrimage","firstHadith":2791,"lastHadith":3397,"count":607},{"id":"16","titleAr":"كتاب النكاح","titleEn":"The Book of Marriage","firstHadith":388,"lastHadith":3567,"count":3180},{"id":"17","titleAr":"كتاب الرضاع","titleEn":"The Book of Suckling","firstHadith":3568,"lastHadith":3651,"count":84},{"id":"18","titleAr":"كتاب الطلاق","titleEn":"The Book of Divorce ","firstHadith":3652,"lastHadith":3742,"count":91},{"id":"19","titleAr":"كتاب اللعان","titleEn":"The Book of Invoking Curses","firstHadith":3743,"lastHadith":3769,"count":27},{"id":"20","titleAr":"كتاب العتق","titleEn":"The Book of Emancipating Slaves","firstHadith":3770,"lastHadith":3800,"count":31},{"id":"21","titleAr":"كتاب البيوع","titleEn":"The Book of Transactions","firstHadith":3801,"lastHadith":3961,"count":161},{"id":"22","titleAr":"كتاب المساقاة والمزارعة","titleEn":"The Book of Musaqah","firstHadith":3962,"lastHadith":4139,"count":178},{"id":"23","titleAr":"كتاب الفرائض","titleEn":"The Book of the Rules of Inheritance","firstHadith":4140,"lastHadith":4162,"count":23},{"id":"24","titleAr":"كتاب الهبات","titleEn":"The Book of Gifts","firstHadith":4163,"lastHadith":4203,"count":41},{"id":"25","titleAr":"كتاب الوصية","titleEn":"The Book of Wills","firstHadith":4204,"lastHadith":4234,"count":31},{"id":"26","titleAr":"كتاب النذر","titleEn":"The Book of Vows","firstHadith":4235,"lastHadith":4253,"count":19},{"id":"27","titleAr":"كتاب الأيمان","titleEn":"The Book of Oaths","firstHadith":4254,"lastHadith":4341,"count":88},{"id":"28","titleAr":"كتاب القسامة والمحاربين والقصاص والديات","titleEn":"The Book of Oaths, Muharibin, Qasas (Retaliation), and Diyat (Blood Money)","firstHadith":4342,"lastHadith":4397,"count":56},{"id":"29","titleAr":"كتاب الحدود","titleEn":"The Book of Legal Punishments","firstHadith":4398,"lastHadith":4469,"count":72},{"id":"30","titleAr":"كتاب الأقضية","titleEn":"The Book of Judicial Decisions","firstHadith":4470,"lastHadith":4497,"count":28},{"id":"31","titleAr":"كتاب اللقطة","titleEn":"The Book of Lost Property","firstHadith":4498,"lastHadith":4518,"count":21},{"id":"32","titleAr":"كتاب الجهاد والسير","titleEn":"The Book of Jihad and Expeditions","firstHadith":4519,"lastHadith":4700,"count":182},{"id":"33","titleAr":"كتاب الإمارة","titleEn":"The Book on Government","firstHadith":4701,"lastHadith":4967,"count":267},{"id":"34","titleAr":"كتاب الصيد والذبائح وما يؤكل من الحيوان","titleEn":"The Book of Hunting, Slaughter, and what may be Eaten","firstHadith":4972,"lastHadith":5063,"count":92},{"id":"35","titleAr":"كتاب الأضاحي","titleEn":"The Book of Sacrifices","firstHadith":5064,"lastHadith":5126,"count":63},{"id":"36","titleAr":"كتاب الأشربة","titleEn":"The Book of Drinks","firstHadith":5114,"lastHadith":5383,"count":270},{"id":"37","titleAr":"كتاب اللباس والزينة","titleEn":"The Book of Clothes and Adornment","firstHadith":5385,"lastHadith":5585,"count":201},{"id":"38","titleAr":"كتاب الآداب","titleEn":"The Book of Manners and Etiquette","firstHadith":5586,"lastHadith":5645,"count":60},{"id":"39","titleAr":"كتاب السلام","titleEn":"The Book of Greetings","firstHadith":5646,"lastHadith":5861,"count":216},{"id":"40","titleAr":"كتاب الألفاظ من الأدب وغيرها","titleEn":"The Book Concerning the Use of Correct Words","firstHadith":5862,"lastHadith":5884,"count":23},{"id":"41","titleAr":"كتاب الشعر","titleEn":"The Book of Poetry","firstHadith":5887,"lastHadith":5896,"count":10},{"id":"42","titleAr":"كتاب الرؤيا","titleEn":"The Book of Dreams","firstHadith":5897,"lastHadith":5937,"count":41},{"id":"43","titleAr":"كتاب الفضائل","titleEn":"The Book of Virtues","firstHadith":384,"lastHadith":6168,"count":5785},{"id":"44","titleAr":"كتاب فضائل الصحابة","titleEn":"The Book of the Merits of the Companions","firstHadith":6169,"lastHadith":6499,"count":331},{"id":"45","titleAr":"كتاب البر والصلة والآداب","titleEn":"The Book of Virtue, Enjoining Good Manners, and Joining of the Ties of Kinship","firstHadith":6500,"lastHadith":6722,"count":223},{"id":"46","titleAr":"كتاب القدر","titleEn":"The Book of Destiny","firstHadith":6723,"lastHadith":6774,"count":52},{"id":"47","titleAr":"كتاب العلم","titleEn":"The Book of Knowledge","firstHadith":6775,"lastHadith":6804,"count":30},{"id":"48","titleAr":"كتاب الذكر والدعاء والتوبة والاستغفار","titleEn":"The Book Pertaining to the Remembrance of Allah, Supplication, Repentance and Seeking Forgiveness ","firstHadith":6805,"lastHadith":6936,"count":132},{"id":"49","titleAr":"كتاب الرقاق","titleEn":"The Book of Heart-Melting Traditions","firstHadith":6937,"lastHadith":6951,"count":15},{"id":"50","titleAr":"كتاب التوبة","titleEn":"The Book of Repentance","firstHadith":6952,"lastHadith":7023,"count":72},{"id":"51","titleAr":"كتاب صفات المنافقين وأحكامهم","titleEn":"Characteristics of The Hypocrites And Rulings Concerning Them","firstHadith":7024,"lastHadith":7044,"count":21},{"id":"52","titleAr":"كتاب صفة القيامة والجنة والنار","titleEn":"Characteristics of the Day of Judgment, Paradise, and Hell","firstHadith":7045,"lastHadith":7129,"count":85},{"id":"53","titleAr":"كتاب الجنة وصفة نعيمها وأهلها","titleEn":"The Book of Paradise, its Description, its Bounties and its Inhabitants","firstHadith":7130,"lastHadith":7234,"count":105},{"id":"54","titleAr":"كتاب الفتن وأشراط الساعة","titleEn":"The Book of Tribulations and Portents of the Last Hour","firstHadith":7235,"lastHadith":7416,"count":182},{"id":"55","titleAr":"كتاب الزهد والرقائق","titleEn":"The Book of Zuhd and Softening of Hearts ","firstHadith":7417,"lastHadith":7522,"count":106},{"id":"56","titleAr":"كتاب التفسير","titleEn":"The Book of Commentary on the Qur'an","firstHadith":7523,"lastHadith":7563,"count":41}]},"nawawi":{"key":"nawawi","edition":"ara-nawawi","nameAr":"الأربعون النووية","authorAr":"الإمام يحيى بن شرف النووي","totalHadiths":42,"totalSections":1,"sections":[{"id":"1","titleAr":"الأربعون النووية كاملة","titleEn":"40 Hadith an-Nawawi","firstHadith":1,"lastHadith":42,"count":42}]}};

// CDN API Base Configuration
const HADETH_API_BASE = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1';

// App State
const state = {
    currentBook: 'bukhari',
    currentSectionId: null,
    currentHadiths: [],
    loadedCount: 0,
    pageSize: 20,
    searchQuery: '',
    fontSize: parseInt(localStorage.getItem('hadith_font_size')) || 20,
    favorites: JSON.parse(localStorage.getItem('hadith_favorites')) || [],
    cache: {
        sections: {},
        nawawi: null
    },
    speakingIdx: null
};

// DOM Elements
const elements = {
    // Book Selection Buttons
    bokharyBtn: document.getElementById('bokhary-btn'),
    muslimBtn: document.getElementById('muslim-btn'),
    nawawiBtn: document.getElementById('nawawi-btn'),
    bookCards: document.querySelectorAll('.book-card'),

    // Legacy Containers (for compatibility)
    bokharyAhadeth: document.getElementById('bokhary-ahadeth'),
    muslimAhadeth: document.getElementById('muslim-ahadeth'),

    // Toolbar Elements
    searchInput: document.getElementById('hadethSearchInput'),
    searchClear: document.getElementById('hadethSearchClear'),
    randomBtn: document.getElementById('randomHadithBtn'),
    favoritesBtn: document.getElementById('favoritesBtn'),
    favCountBadge: document.getElementById('favCountBadge'),
    fontDecreaseBtn: document.getElementById('fontDecreaseBtn'),
    fontResetBtn: document.getElementById('fontResetBtn'),
    fontIncreaseBtn: document.getElementById('fontIncreaseBtn'),

    // Sections Grid View
    sectionsView: document.getElementById('sectionsView'),
    sectionsTitle: document.getElementById('sectionsTitle'),
    sectionsCountTag: document.getElementById('sectionsCountTag'),
    sectionsGrid: document.getElementById('sectionsGrid'),

    // Hadiths Reader View
    readerWrapper: document.getElementById('hadithsReaderWrapper'),
    backToSectionsBtn: document.getElementById('backToSectionsBtn'),
    prevSectionBtn: document.getElementById('prevSectionBtn'),
    nextSectionBtn: document.getElementById('nextSectionBtn'),
    readerChapterTitle: document.getElementById('readerChapterTitle'),
    readerBookTag: document.getElementById('readerBookTag'),
    readerHadithCountTag: document.getElementById('readerHadithCountTag'),
    readerRangeTag: document.getElementById('readerRangeTag'),
    loadingBox: document.getElementById('hadethLoadingBox'),
    hadithsList: document.getElementById('hadithsList'),
    loadMoreContainer: document.getElementById('loadMoreContainer'),
    loadMoreBtn: document.getElementById('loadMoreBtn'),

    // Modals & Drawers
    modalBackdrop: document.getElementById('modalBackdrop'),
    randomModal: document.getElementById('randomHadithModal'),
    randomModalBody: document.getElementById('randomHadithModalBody'),
    closeRandomModalBtn: document.getElementById('closeRandomModalBtn'),
    nextRandomHadithBtn: document.getElementById('nextRandomHadithBtn'),

    favoritesModal: document.getElementById('favoritesModal'),
    favoritesModalBody: document.getElementById('favoritesModalBody'),
    closeFavoritesModalBtn: document.getElementById('closeFavoritesModalBtn'),

    // Toast
    toast: document.getElementById('hadithToast'),
    toastMessage: document.getElementById('toastMessage')
};

// ========================================================
// INITIALIZATION
// ========================================================
function initAhadethApp() {
    applyFontSize();
    updateFavoritesBadge();
    bindEvents();
    switchBook('bukhari');
}

// Bind all interactive events
function bindEvents() {
    // Book Switching
    if (elements.bokharyBtn) {
        elements.bokharyBtn.addEventListener('click', () => switchBook('bukhari'));
    }
    if (elements.muslimBtn) {
        elements.muslimBtn.addEventListener('click', () => switchBook('muslim'));
    }
    if (elements.nawawiBtn) {
        elements.nawawiBtn.addEventListener('click', () => switchBook('nawawi'));
    }

    // Search input
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.trim();
            if (elements.searchClear) {
                elements.searchClear.style.display = state.searchQuery ? 'block' : 'none';
            }
            filterSections();
        });

        // Press Enter to search by hadith number directly
        elements.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = state.searchQuery;
                if (/^\d+$/.test(query)) {
                    loadHadithByNumber(parseInt(query, 10));
                }
            }
        });
    }

    // Search Clear
    if (elements.searchClear) {
        elements.searchClear.addEventListener('click', () => {
            elements.searchInput.value = '';
            state.searchQuery = '';
            elements.searchClear.style.display = 'none';
            filterSections();
        });
    }

    // Font Size Controls
    if (elements.fontDecreaseBtn) {
        elements.fontDecreaseBtn.addEventListener('click', () => changeFontSize(-2));
    }
    if (elements.fontResetBtn) {
        elements.fontResetBtn.addEventListener('click', () => {
            state.fontSize = 20;
            saveFontSize();
        });
    }
    if (elements.fontIncreaseBtn) {
        elements.fontIncreaseBtn.addEventListener('click', () => changeFontSize(2));
    }

    // Reader Navigation
    if (elements.backToSectionsBtn) {
        elements.backToSectionsBtn.addEventListener('click', closeReader);
    }
    if (elements.prevSectionBtn) {
        elements.prevSectionBtn.addEventListener('click', () => navigateSection(-1));
    }
    if (elements.nextSectionBtn) {
        elements.nextSectionBtn.addEventListener('click', () => navigateSection(1));
    }

    // Load More Button
    if (elements.loadMoreBtn) {
        elements.loadMoreBtn.addEventListener('click', loadMoreHadiths);
    }

    // Modals triggers
    if (elements.randomBtn) {
        elements.randomBtn.addEventListener('click', openRandomHadithModal);
    }
    if (elements.closeRandomModalBtn) {
        elements.closeRandomModalBtn.addEventListener('click', closeModals);
    }
    if (elements.nextRandomHadithBtn) {
        elements.nextRandomHadithBtn.addEventListener('click', fetchRandomHadith);
    }

    if (elements.favoritesBtn) {
        elements.favoritesBtn.addEventListener('click', openFavoritesModal);
    }
    if (elements.closeFavoritesModalBtn) {
        elements.closeFavoritesModalBtn.addEventListener('click', closeModals);
    }

    if (elements.modalBackdrop) {
        elements.modalBackdrop.addEventListener('click', closeModals);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModals();
    });
}

// ========================================================
// BOOK SWITCHING & SECTIONS RENDERING
// ========================================================
function switchBook(bookKey) {
    if (!HADETH_BOOKS[bookKey]) return;
    state.currentBook = bookKey;

    // Update active card styling
    elements.bookCards.forEach(card => {
        if (card.getAttribute('data-book') === bookKey) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });

    const book = HADETH_BOOKS[bookKey];

    // Update Sections Title
    if (elements.sectionsTitle) {
        elements.sectionsTitle.innerHTML = `<i class="fa-solid fa-layer-group"></i> <span>أبواب ${book.nameAr}</span>`;
    }
    if (elements.sectionsCountTag) {
        elements.sectionsCountTag.textContent = `${book.totalSections} ${bookKey === 'nawawi' ? 'باب' : 'كتاباً'}`;
    }

    // Switch view back to sections
    closeReader();

    // Render Chapters
    filterSections();
}

function filterSections() {
    const book = HADETH_BOOKS[state.currentBook];
    if (!book || !book.sections) return;

    const query = state.searchQuery.toLowerCase();
    const filtered = book.sections.filter(sec => {
        if (!query) return true;
        const inAr = sec.titleAr && sec.titleAr.toLowerCase().includes(query);
        const inEn = sec.titleEn && sec.titleEn.toLowerCase().includes(query);
        const inId = sec.id && sec.id.toString() === query;
        const inRange = (parseInt(query) >= sec.firstHadith && parseInt(query) <= sec.lastHadith);
        return inAr || inEn || inId || inRange;
    });

    renderSectionsGrid(filtered);
}

function renderSectionsGrid(sections) {
    if (!elements.sectionsGrid) return;
    elements.sectionsGrid.innerHTML = '';

    if (sections.length === 0) {
        elements.sectionsGrid.innerHTML = `
            <div class="empty-state col-12">
                <i class="fa-solid fa-magnifying-glass"></i>
                <p>لم نجد أبواباً تطابق بحثك: "${state.searchQuery}"</p>
            </div>
        `;
        return;
    }

    const frag = document.createDocumentFragment();

    sections.forEach(sec => {
        const card = document.createElement('div');
        card.className = 'section-card';
        card.dataset.sectionId = sec.id;

        card.innerHTML = `
            <div>
                <div class="section-card-top">
                    <span class="section-num-badge">باب ${sec.id}</span>
                    <span class="section-hadith-count">
                        <i class="fa-solid fa-book-open"></i> ${sec.count || '—'} حديث
                    </span>
                </div>
                <h4 class="section-card-title">${sec.titleAr || sec.titleEn}</h4>
            </div>
            <div class="section-card-footer">
                <span>الأحاديث: ${sec.firstHadith} - ${sec.lastHadith}</span>
                <i class="fa-solid fa-arrow-left section-arrow-icon"></i>
            </div>
        `;

        card.addEventListener('click', () => openSection(sec.id));
        frag.appendChild(card);
    });

    elements.sectionsGrid.appendChild(frag);
}

// ========================================================
// HADITHS READER VIEW
// ========================================================
async function openSection(sectionId) {
    const book = HADETH_BOOKS[state.currentBook];
    if (!book) return;

    state.currentSectionId = sectionId;
    const secMeta = book.sections.find(s => s.id == sectionId) || {
        id: sectionId,
        titleAr: 'باب ' + sectionId,
        count: 0,
        firstHadith: 1,
        lastHadith: 1
    };

    // Update Header Info
    if (elements.readerChapterTitle) elements.readerChapterTitle.textContent = secMeta.titleAr || secMeta.titleEn;
    if (elements.readerBookTag) elements.readerBookTag.innerHTML = `<i class="fa-solid fa-book"></i> ${book.nameAr}`;
    if (elements.readerHadithCountTag) elements.readerHadithCountTag.innerHTML = `<i class="fa-solid fa-list-ol"></i> ${secMeta.count} حديث`;
    if (elements.readerRangeTag) elements.readerRangeTag.innerHTML = `<i class="fa-solid fa-hashtag"></i> الأحاديث من ${secMeta.firstHadith} إلى ${secMeta.lastHadith}`;

    // Update Prev / Next buttons
    const curIdx = book.sections.findIndex(s => s.id == sectionId);
    if (elements.prevSectionBtn) elements.prevSectionBtn.disabled = curIdx <= 0;
    if (elements.nextSectionBtn) elements.nextSectionBtn.disabled = curIdx >= book.sections.length - 1;

    // Switch View
    if (elements.sectionsView) elements.sectionsView.style.display = 'none';
    if (elements.readerWrapper) elements.readerWrapper.classList.add('active');

    // Scroll to reader top smoothly
    window.scrollTo({ top: elements.readerWrapper.offsetTop - 90, behavior: 'smooth' });

    // Fetch and display hadiths
    await fetchAndRenderSectionHadiths(book, sectionId);
}

function closeReader() {
    stopSpeaking();
    if (elements.readerWrapper) elements.readerWrapper.classList.remove('active');
    if (elements.sectionsView) elements.sectionsView.style.display = 'block';
    state.currentSectionId = null;
    state.currentHadiths = [];
    state.loadedCount = 0;
}

function navigateSection(delta) {
    const book = HADETH_BOOKS[state.currentBook];
    if (!book) return;
    const curIdx = book.sections.findIndex(s => s.id == state.currentSectionId);
    const newIdx = curIdx + delta;
    if (newIdx >= 0 && newIdx < book.sections.length) {
        openSection(book.sections[newIdx].id);
    }
}

// Fetch Section Hadiths via API with caching
async function fetchAndRenderSectionHadiths(book, sectionId) {
    if (!elements.hadithsList || !elements.loadingBox) return;

    elements.hadithsList.innerHTML = '';
    elements.loadingBox.style.display = 'block';
    if (elements.loadMoreContainer) elements.loadMoreContainer.style.display = 'none';

    const cacheKey = `${book.edition}_${sectionId}`;

    try {
        let hadiths = [];

        if (state.cache.sections[cacheKey]) {
            hadiths = state.cache.sections[cacheKey];
        } else if (book.key === 'nawawi') {
            if (state.cache.nawawi) {
                hadiths = state.cache.nawawi;
            } else {
                const res = await fetch(`${HADETH_API_BASE}/editions/ara-nawawi.min.json`);
                if (!res.ok) throw new Error('فشل تحميل الأربعين النووية');
                const data = await res.json();
                hadiths = data.hadiths || [];
                state.cache.nawawi = hadiths;
            }
        } else {
            const url = `${HADETH_API_BASE}/editions/${book.edition}/sections/${sectionId}.json`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('تعذر تحميل أحاديث هذا الباب من الخادم');
            const data = await res.json();
            hadiths = data.hadiths || [];
            state.cache.sections[cacheKey] = hadiths;
        }

        elements.loadingBox.style.display = 'none';

        if (!hadiths || hadiths.length === 0) {
            elements.hadithsList.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <p>لم يتم العثور على أحاديث لهذا الباب حالياً.</p>
                </div>
            `;
            return;
        }

        state.currentHadiths = hadiths;
        state.loadedCount = 0;
        loadMoreHadiths();

        // Also update legacy container for compatibility
        if (state.currentBook === 'bukhari' && elements.bokharyAhadeth) {
            elements.bokharyAhadeth.innerHTML = `<div class="alert alert-info">تم تحميل ${hadiths.length} حديثاً من صحيح البخاري</div>`;
        } else if (state.currentBook === 'muslim' && elements.muslimAhadeth) {
            elements.muslimAhadeth.innerHTML = `<div class="alert alert-info">تم تحميل ${hadiths.length} حديثاً من صحيح مسلم</div>`;
        }

    } catch (err) {
        console.error('Fetch Hadiths Error:', err);
        elements.loadingBox.style.display = 'none';
        elements.hadithsList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-circle-exclamation" style="color:#e74c3c;"></i>
                <p>حدث خطأ أثناء تحميل الأحاديث: ${err.message}</p>
                <button class="hadeth-btn btn-gold mt-3" onclick="openSection('${sectionId}')">
                    <i class="fa-solid fa-rotate-right"></i> إعادة المحاولة
                </button>
            </div>
        `;
    }
}

// Progressive pagination rendering
function loadMoreHadiths() {
    if (!elements.hadithsList) return;

    const hadiths = state.currentHadiths;
    const start = state.loadedCount;
    const end = Math.min(start + state.pageSize, hadiths.length);
    const slice = hadiths.slice(start, end);

    const book = HADETH_BOOKS[state.currentBook];
    const frag = document.createDocumentFragment();

    slice.forEach((h, idx) => {
        const globalIdx = start + idx;
        const card = createHadithCardElement(h, book, globalIdx);
        frag.appendChild(card);
    });

    elements.hadithsList.appendChild(frag);
    state.loadedCount = end;

    // Load More Visibility
    if (elements.loadMoreContainer) {
        if (state.loadedCount < hadiths.length) {
            elements.loadMoreContainer.style.display = 'block';
            if (elements.loadMoreBtn) {
                elements.loadMoreBtn.innerHTML = `
                    <i class="fa-solid fa-angles-down"></i>
                    <span>عرض المزيد من الأحاديث (${hadiths.length - state.loadedCount} متبقي)</span>
                `;
            }
        } else {
            elements.loadMoreContainer.style.display = 'none';
        }
    }
}

// Create a single Hadith Card
function createHadithCardElement(hadith, book, idx) {
    const card = document.createElement('div');
    card.className = 'hadith-card';
    card.id = `hadith-${hadith.hadithnumber || hadith.arabicnumber || idx}`;

    const isFav = isHadithFavorited(hadith, book.key);
    const cleanText = cleanHadithText(hadith.text);

    card.innerHTML = `
        <div class="hadith-card-header">
            <div class="d-flex align-items-center gap-2">
                <span class="hadith-num-badge">
                    <i class="fa-solid fa-hashtag"></i> حديث ${hadith.hadithnumber || hadith.arabicnumber || (idx + 1)}
                </span>
                <span class="hadith-narrator-tag">${book.nameAr}</span>
            </div>
            ${hadith.reference ? `<span class="text-muted small">كتاب ${hadith.reference.book || 1} • حديث ${hadith.reference.hadith || (idx + 1)}</span>` : ''}
        </div>

        <div class="hadith-body">
            <p class="hadith-text">${cleanText}</p>
        </div>

        <div class="hadith-card-actions">
            <div class="hadith-citation">
                <i class="fa-solid fa-quote-right"></i> ${book.nameAr} (رقم ${hadith.hadithnumber || hadith.arabicnumber || (idx + 1)})
            </div>
            <div class="hadith-action-btns">
                <button class="hadith-action-btn" title="نسخ الحديث" data-action="copy">
                    <i class="fa-regular fa-copy"></i>
                </button>
                <button class="hadith-action-btn ${isFav ? 'active-fav' : ''}" title="${isFav ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}" data-action="favorite">
                    <i class="fa-${isFav ? 'solid' : 'regular'} fa-bookmark"></i>
                </button>
            </div>
        </div>
    `;

    // Event Delegation for action buttons
    card.querySelector('[data-action="copy"]').addEventListener('click', () => {
        copyHadithToClipboard(cleanText, book.nameAr, hadith.hadithnumber);
    });

    const favBtn = card.querySelector('[data-action="favorite"]');
    favBtn.addEventListener('click', () => {
        toggleHadithFavorite(hadith, book, favBtn);
    });

    return card;
}

// Clean and format Hadith text
function cleanHadithText(rawText) {
    if (!rawText) return '';
    return rawText
        .replace(/\r\n/g, ' ')
        .replace(/\n/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

// ========================================================
// DIRECT HADITH SEARCH BY NUMBER
// ========================================================
async function loadHadithByNumber(num) {
    const book = HADETH_BOOKS[state.currentBook];
    if (!book) return;

    if (num < 1 || (book.totalHadiths && num > book.totalHadiths + 500)) {
        showToast(`رقم الحديث غير متاح، يرجى إدخال رقم بين 1 و ${book.totalHadiths}`);
        return;
    }

    // Switch View
    if (elements.sectionsView) elements.sectionsView.style.display = 'none';
    if (elements.readerWrapper) elements.readerWrapper.classList.add('active');
    if (elements.hadithsList) elements.hadithsList.innerHTML = '';
    if (elements.loadingBox) elements.loadingBox.style.display = 'block';

    if (elements.readerChapterTitle) elements.readerChapterTitle.textContent = `بحث عن حديث رقم: ${num}`;
    if (elements.readerBookTag) elements.readerBookTag.innerHTML = `<i class="fa-solid fa-book"></i> ${book.nameAr}`;

    try {
        const url = `${HADETH_API_BASE}/editions/${book.edition}/${num}.json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('الحديث غير متوفر');
        const data = await res.json();
        const hadiths = data.hadiths || [];

        if (elements.loadingBox) elements.loadingBox.style.display = 'none';

        if (hadiths.length === 0) {
            elements.hadithsList.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-circle-question"></i>
                    <p>لم يتم العثور على حديث برقم ${num} في ${book.nameAr}</p>
                </div>
            `;
            return;
        }

        state.currentHadiths = hadiths;
        state.loadedCount = 0;
        loadMoreHadiths();

    } catch (err) {
        if (elements.loadingBox) elements.loadingBox.style.display = 'none';
        elements.hadithsList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-circle-exclamation" style="color:#e74c3c;"></i>
                <p>تعذر جلب الحديث رقم ${num}: ${err.message}</p>
            </div>
        `;
    }
}

// ========================================================
// ACTIONS (COPY, FAVORITES, SHARE, SPEECH, FONT SIZE)
// ========================================================
function copyHadithToClipboard(text, bookName, hadithNumber) {
    const citation = `\n\n[المصدر: ${bookName} - حديث رقم ${hadithNumber || '—'}]`;
    const fullText = text + citation;

    navigator.clipboard.writeText(fullText)
        .then(() => showToast('تم نسخ الحديث الشريف بنجاح ✨'))
        .catch(() => showToast('تعذر النسخ، يرجى المحاولة يدوياً'));
}

function shareHadith(text, bookName, hadithNumber) {
    const title = `حديث شريف من ${bookName}`;
    const fullText = `${text}\n\n[المصدر: ${bookName} - حديث رقم ${hadithNumber || '—'}]`;

    if (navigator.share) {
        navigator.share({
            title: title,
            text: fullText,
            url: window.location.href
        }).catch(() => {});
    } else {
        copyHadithToClipboard(text, bookName, hadithNumber);
    }
}

function isHadithFavorited(hadith, bookKey) {
    const id = hadith.hadithnumber || hadith.arabicnumber;
    return state.favorites.some(f => f.bookKey === bookKey && f.id === id);
}

function toggleHadithFavorite(hadith, book, btnElement) {
    const id = hadith.hadithnumber || hadith.arabicnumber;
    const existingIdx = state.favorites.findIndex(f => f.bookKey === book.key && f.id === id);

    if (existingIdx > -1) {
        // Remove
        state.favorites.splice(existingIdx, 1);
        if (btnElement) {
            btnElement.classList.remove('active-fav');
            btnElement.querySelector('i').className = 'fa-regular fa-bookmark';
            btnElement.title = 'إضافة للمفضلة';
        }
        showToast('تمت إزالة الحديث من المفضلة');
    } else {
        // Add
        state.favorites.push({
            id: id,
            bookKey: book.key,
            bookName: book.nameAr,
            text: cleanHadithText(hadith.text),
            date: new Date().toLocaleDateString('ar-EG')
        });
        if (btnElement) {
            btnElement.classList.add('active-fav');
            btnElement.querySelector('i').className = 'fa-solid fa-bookmark';
            btnElement.title = 'إزالة من المفضلة';
        }
        showToast('تمت إضافة الحديث إلى المفضلة ⭐');
    }

    localStorage.setItem('hadith_favorites', JSON.stringify(state.favorites));
    updateFavoritesBadge();
}

function updateFavoritesBadge() {
    if (elements.favCountBadge) {
        elements.favCountBadge.textContent = state.favorites.length;
    }
}

// Text-to-Speech
let currentSpeakingBtn = null;

function toggleSpeech(text, btn) {
    if (!('speechSynthesis' in window)) {
        showToast('المتصفح لا يدعم القراءة الصوتية');
        return;
    }

    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        if (currentSpeakingBtn) {
            currentSpeakingBtn.classList.remove('speaking');
            currentSpeakingBtn.querySelector('i').className = 'fa-solid fa-volume-high';
        }
        if (currentSpeakingBtn === btn) {
            currentSpeakingBtn = null;
            return;
        }
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.9;

    utterance.onstart = () => {
        btn.classList.add('speaking');
        btn.querySelector('i').className = 'fa-solid fa-stop';
        currentSpeakingBtn = btn;
    };

    utterance.onend = utterance.onerror = () => {
        btn.classList.remove('speaking');
        btn.querySelector('i').className = 'fa-solid fa-volume-high';
        currentSpeakingBtn = null;
    };

    window.speechSynthesis.speak(utterance);
}

function stopSpeaking() {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
    if (currentSpeakingBtn) {
        currentSpeakingBtn.classList.remove('speaking');
        currentSpeakingBtn.querySelector('i').className = 'fa-solid fa-volume-high';
        currentSpeakingBtn = null;
    }
}

// Font Size Controls
function changeFontSize(delta) {
    state.fontSize = Math.min(34, Math.max(16, state.fontSize + delta));
    saveFontSize();
}

function saveFontSize() {
    localStorage.setItem('hadith_font_size', state.fontSize);
    applyFontSize();
}

function applyFontSize() {
    document.documentElement.style.setProperty('--hadith-font-size', state.fontSize + 'px');
}

// ========================================================
// MODALS LOGIC (RANDOM HADITH & FAVORITES)
// ========================================================
function closeModals() {
    if (elements.modalBackdrop) elements.modalBackdrop.classList.remove('open');
    if (elements.randomModal) elements.randomModal.classList.remove('open');
    if (elements.favoritesModal) elements.favoritesModal.classList.remove('open');
    document.body.style.overflow = '';
}

function openRandomHadithModal() {
    if (elements.modalBackdrop) elements.modalBackdrop.classList.add('open');
    if (elements.randomModal) elements.randomModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    fetchRandomHadith();
}

async function fetchRandomHadith() {
    if (!elements.randomModalBody) return;
    elements.randomModalBody.innerHTML = `
        <div class="hadeth-loading-box">
            <div class="hadeth-spinner"></div>
            <p class="hadeth-loading-text">جاري جلب حديث شريف ملهم...</p>
        </div>
    `;

    // Choose random edition: 60% Bukhari, 35% Muslim, 5% Nawawi
    const rnd = Math.random();
    let bookKey = 'bukhari';
    let maxNumber = 7563;

    if (rnd > 0.65) {
        bookKey = 'muslim';
        maxNumber = 7400;
    } else if (rnd > 0.95) {
        bookKey = 'nawawi';
        maxNumber = 42;
    }

    const book = HADETH_BOOKS[bookKey];
    const randNum = Math.floor(Math.random() * maxNumber) + 1;

    try {
        let hadithText = '';
        let hadithNumber = randNum;

        if (bookKey === 'nawawi') {
            const res = await fetch(`${HADETH_API_BASE}/editions/ara-nawawi.min.json`);
            const data = await res.json();
            const h = (data.hadiths && data.hadiths[randNum - 1]) || data.hadiths[0];
            hadithText = cleanHadithText(h.text);
            hadithNumber = h.hadithnumber || randNum;
        } else {
            const res = await fetch(`${HADETH_API_BASE}/editions/${book.edition}/${randNum}.json`);
            if (!res.ok) throw new Error('تعذر جلب الحديث');
            const data = await res.json();
            const h = (data.hadiths && data.hadiths[0]) || {};
            hadithText = cleanHadithText(h.text);
            hadithNumber = h.hadithnumber || randNum;
        }

        elements.randomModalBody.innerHTML = `
            <div class="hadith-card" style="box-shadow:none; border:none; padding:10px 0;">
                <div class="hadith-card-header">
                    <span class="hadith-num-badge">
                        <i class="fa-solid fa-scroll"></i> ${book.nameAr} - حديث #${hadithNumber}
                    </span>
                    <span class="hadith-narrator-tag">${book.authorAr}</span>
                </div>
                <div class="hadith-body mt-3">
                    <p class="hadith-text" style="font-size:${state.fontSize + 2}px;">${hadithText}</p>
                </div>
                <div class="hadith-card-actions mt-4">
                    <div class="hadith-citation">
                        <i class="fa-solid fa-check"></i> صحيح مخرج
                    </div>
                    <div class="hadith-action-btns">
                        <button class="hadeth-action-btn" id="randomModalCopyBtn" title="نسخ الحديث">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('randomModalCopyBtn')?.addEventListener('click', () => {
            copyHadithToClipboard(hadithText, book.nameAr, hadithNumber);
        });

    } catch (err) {
        console.error('Random Hadith Error:', err);
        elements.randomModalBody.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-rotate-right"></i>
                <p>تعذر تحميل حديث عشوائي، اضغط أدناه للمحاولة مرة أخرى.</p>
                <button class="hadeth-btn btn-gold mt-3" onclick="fetchRandomHadith()">إعادة المحاولة</button>
            </div>
        `;
    }
}

function openFavoritesModal() {
    if (elements.modalBackdrop) elements.modalBackdrop.classList.add('open');
    if (elements.favoritesModal) elements.favoritesModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderFavoritesList();
}

function renderFavoritesList() {
    if (!elements.favoritesModalBody) return;

    if (state.favorites.length === 0) {
        elements.favoritesModalBody.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-bookmark"></i>
                <p>لم تقم بحفظ أي أحاديث في المفضلة بعد.</p>
                <span class="text-muted small">اضغط على أيقونة الإشارة المرجعية بجانب أي حديث لحفظه هنا والرجوع إليه لاحقاً.</span>
            </div>
        `;
        return;
    }

    elements.favoritesModalBody.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'd-flex flex-column gap-3';

    state.favorites.forEach((fav, idx) => {
        const item = document.createElement('div');
        item.className = 'hadith-card';
        item.innerHTML = `
            <div class="hadith-card-header">
                <span class="hadith-num-badge">
                    <i class="fa-solid fa-bookmark"></i> ${fav.bookName} #${fav.id}
                </span>
                <span class="text-muted small">حفظ في: ${fav.date || '—'}</span>
            </div>
            <div class="hadith-body">
                <p class="hadith-text" style="font-size: 17px;">${fav.text}</p>
            </div>
            <div class="hadith-card-actions">
                <button class="hadeth-btn" data-action="copy-fav" style="height:34px; padding:0 12px; font-size:12px;">
                    <i class="fa-regular fa-copy"></i> نسخ
                </button>
                <button class="hadeth-btn text-danger" data-action="del-fav" style="height:34px; padding:0 12px; font-size:12px;">
                    <i class="fa-solid fa-trash"></i> حذف
                </button>
            </div>
        `;

        item.querySelector('[data-action="copy-fav"]').addEventListener('click', () => {
            copyHadithToClipboard(fav.text, fav.bookName, fav.id);
        });

        item.querySelector('[data-action="del-fav"]').addEventListener('click', () => {
            state.favorites.splice(idx, 1);
            localStorage.setItem('hadith_favorites', JSON.stringify(state.favorites));
            updateFavoritesBadge();
            renderFavoritesList();
            showToast('تم حذف الحديث من المفضلة');
        });

        container.appendChild(item);
    });

    elements.favoritesModalBody.appendChild(container);
}

// ========================================================
// TOAST NOTIFICATIONS
// ========================================================
let toastTimer = null;

function showToast(message) {
    if (!elements.toast || !elements.toastMessage) return;

    elements.toastMessage.textContent = message;
    elements.toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', initAhadethApp);
