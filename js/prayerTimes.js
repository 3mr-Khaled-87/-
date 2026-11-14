// API مواقيت الصلاة (Aladhan API) - مجاني وبدون الحاجة لـ API Key
const API_URL = "https://api.aladhan.com/v1/timings";

// عناصر الـ DOM
let meladyDate = document.getElementById("meladyDate");
let hejryDate  = document.getElementById("hejryDate");
let day        = document.getElementById("day");
let month      = document.getElementById("month");
let TimeZone   = document.getElementById("timeZone");
let nowPrayerTime = document.getElementById("nowPrayerTime");
let allTimes      = document.getElementById("allTimes");
let prayerTimeText = document.querySelectorAll(".prayer-time");

// المتغيرات التي سيتم تخزين الداتا فيها
let prayerData  = null;      // كل بيانات الاستجابة
let prayer_times = {};        // مواقيت الصلاة (بالأسماء الإنجليزية – 24 ساعة) → تُستخدم للحسابات الداخلية

// ─────────────────────────────────────────
// 🕐 تحويل الوقت 24h ← 12h (ص / م)
// ─────────────────────────────────────────
function to12Hour(timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    const period  = h < 12 ? "ص" : "م";
    const hour12  = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const minStr  = String(m).padStart(2, "0");
    return `${hour12}:${minStr} ${period}`;
}

// ─────────────────────────────────────────
// 📍 جلب الإحداثيات (مع fallback للقاهرة)
// ─────────────────────────────────────────
function getCoordinates() {
    return new Promise((resolve) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }),
                (error) => {
                    console.warn("لم نتمكن من تحديد الموقع، تم استخدام إحداثيات القاهرة تلقائياً:", error.message);
                    resolve({ lat: 30.0444, lng: 31.2357 });
                },
                { timeout: 7000 }
            );
        } else {
            resolve({ lat: 30.0444, lng: 31.2357 });
        }
    });
}

// ─────────────────────────────────────────
// 🌐 جلب مواقيت الصلاة من الـ API
// ─────────────────────────────────────────
async function getPrayerTimesData() {
    try {
        const coords   = await getCoordinates();
        const response = await fetch(`${API_URL}?latitude=${coords.lat}&longitude=${coords.lng}&method=5`);

        if (!response.ok) throw new Error(`خطأ في جلب البيانات: ${response.status}`);

        const result = await response.json();

        // 1. تخزين كامل البيانات
        prayerData = result.data;
        const defaultTimes = prayerData.timings;

        // 2. تحديث بطاقات الصلوات بتنسيق 12h
        prayerTimeText.forEach((t) => {
            const elementName = t.getAttribute("name");
            if (elementName && defaultTimes[elementName]) {
                t.textContent = to12Hour(defaultTimes[elementName]);
            }
        });

        // 3. تخزين الصلوات الخمس + الشروق (24h) للحسابات
        const keysNeeded = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        Object.entries(defaultTimes).forEach(([key, value]) => {
            if (keysNeeded.includes(key)) prayer_times[key] = value;
        });

        // 4. تحويل المفاتيح إلى أسماء عربية (لكن الـ value يبقى 24h للحسابات)
        prayer_times = getArabicNames(prayer_times);

        // 5. عرض التواريخ
        meladyDate.textContent = prayerData.date.readable;
        hejryDate.textContent  = prayerData.date.hijri.date;
        day.textContent        = prayerData.date.hijri.weekday.ar;
        month.textContent      = prayerData.date.hijri.month.ar;

        console.log("تم جلب البيانات بنجاح:", prayerData);
        console.log("مواقيت الصلاة:", prayer_times);

        // 6. بدء حلقة التحديث (كل ثانية)
        updateNowCard();
        setInterval(updateNowCard, 1000);

    } catch (err) {
        console.error("حدث خطأ أثناء جلب مواقيت الصلاة:", err);
    }
}

// استدعاء الدالة لبدء التحميل
getPrayerTimesData();

// ─────────────────────────────────────────
// 🔡 تحويل أسماء الصلوات للعربية
// ─────────────────────────────────────────
function getArabicNames(prayerTimes) {
    const arabicNames = {
        Fajr:    'الفجر',
        Sunrise: 'الشروق',
        Dhuhr:   'الظهر',
        Asr:     'العصر',
        Maghrib: 'المغرب',
        Isha:    'العشاء'
    };
    const newPrayerTimes = {};
    Object.entries(prayerTimes).forEach(([key, value]) => {
        newPrayerTimes[arabicNames[key]] = value;
    });
    return newPrayerTimes;
}

// ─────────────────────────────────────────
// ⏳ حساب الصلاة القادمة + الوقت المتبقي
// returns { name, time24, remainingSeconds } | null
// ─────────────────────────────────────────
function getNextPrayer(prayerTimesObj) {
    const now = new Date();
    const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    const prayers = Object.entries(prayerTimesObj); // [[اسم, "HH:MM"], ...]

    for (let i = 0; i < prayers.length; i++) {
        const [name, time24] = prayers[i];
        const [h, m] = time24.split(":").map(Number);
        const prayerSeconds = h * 3600 + m * 60;

        // اعتمد 10 دقيقة كـ grace period (نفس منطق الكود القديم)
        const start = prayerSeconds + 10 * 60;

        // حدّد نهاية الفترة (بداية الصلاة التالية + 10 دقائق)
        const nextIndex = (i + 1) % prayers.length;
        const [nh, nm]  = prayers[nextIndex][1].split(":").map(Number);
        let   nextStart = nh * 3600 + nm * 60 + 10 * 60;

        let   adjCurrent = currentSeconds;

        // إذا كانت آخر صلاة (العشاء) → نضيف يوم كامل لتجاوز منتصف الليل
        if (i === prayers.length - 1) {
            nextStart += 86400;
            if (currentSeconds < prayerSeconds) adjCurrent += 86400;
        }

        if (adjCurrent >= start && adjCurrent < nextStart) {
            // الصلاة القادمة هي العنصر التالي (أو الأول في حالة العشاء)
            const nextName  = prayers[nextIndex][0];
            const nextTime24 = prayers[nextIndex][1];
            const [nH, nM] = nextTime24.split(":").map(Number);
            let   targetSeconds = nH * 3600 + nM * 60;
            if (targetSeconds <= currentSeconds) targetSeconds += 86400; // غداً
            const remaining = targetSeconds - currentSeconds;
            return { name: nextName, time24: nextTime24, remainingSeconds: remaining };
        }
    }

    // fallback: الصلاة القادمة هي الأولى غداً
    const [firstName, firstTime] = prayers[0];
    const [fH, fM] = firstTime.split(":").map(Number);
    let   targetSeconds = fH * 3600 + fM * 60;
    if (targetSeconds <= currentSeconds) targetSeconds += 86400;
    return { name: firstName, time24: firstTime, remainingSeconds: targetSeconds - currentSeconds };
}

// ─────────────────────────────────────────
// 🔄 تحديث بطاقة "الصلاة القادمة"
// ─────────────────────────────────────────
function updateNowCard() {
    if (!Object.keys(prayer_times).length) return;

    const next = getNextPrayer(prayer_times);
    if (!next) return;

    const { name, time24, remainingSeconds } = next;

    // تنسيق العد التنازلي   HH:MM:SS
    const hh = Math.floor(remainingSeconds / 3600);
    const mm = Math.floor((remainingSeconds % 3600) / 60);
    const ss = remainingSeconds % 60;
    const countdown = `${String(hh).padStart(2,"0")}:${String(mm).padStart(2,"0")}:${String(ss).padStart(2,"0")}`;

    // تحديث عنصر #nowPrayerTime (الاسم + الوقت 12h)
    nowPrayerTime.innerHTML = `
        <span class="next-prayer-name">${name}</span>
        <span class="next-prayer-time-display">${to12Hour(time24)}</span>
    `;

    // تحديث العد التنازلي في .counterDowen .time
    const countdownEl = document.querySelector(".counterDowen .time");
    if (countdownEl) countdownEl.textContent = countdown;
}

// ─────────────────────────────────────────
// createNowTimeCard — محتفظ بها للتوافقية (غير مستخدمة في العرض)
// ─────────────────────────────────────────
function createNowTimeCard(PrayerTimes) {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const prayers = Object.entries(PrayerTimes);
    for (let i = 0; i < prayers.length; i++) {
        const [prayer, time] = prayers[i];
        const [hours, minutes] = time.split(":").map(Number);
        const prayerMinutes   = hours * 60 + minutes;
        const nextPrayer      = prayers[(i + 1) % prayers.length];
        if (nextPrayer) {
            const [nextHours, nextMinutes] = nextPrayer[1].split(":").map(Number);
            let nextPrayerMinutes  = nextHours * 60 + nextMinutes;
            let adjustCurrentMinutes = currentMinutes;
            if (i === prayers.length - 1) {
                nextPrayerMinutes += 1440;
                if (currentMinutes < prayerMinutes) adjustCurrentMinutes += 1440;
            }
            if (adjustCurrentMinutes >= prayerMinutes + 10 && adjustCurrentMinutes < nextPrayerMinutes + 10) {
                return nextPrayer;
            }
        }
    }
    return prayers[0] ?? null;
}
