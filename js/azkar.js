const azkarAPI = 'https://quran.yousefheiba.com/api/azkar';
let links = document.querySelectorAll('.azkar-links div');
let azkarContent = document.querySelector('.azkar-content');


//////////////////////////////////////////////////////////////

const _backBtn = document.getElementById('azkarBackBtn');
const _backdrop = document.getElementById('azkarBackdrop');
const _panelTitle = document.getElementById('azkarPanelTitle');
const _content = document.querySelector('.azkar-content');

document.querySelectorAll('.azkar-links > div').forEach(div => {
    div.addEventListener('click', () => {
        _panelTitle.textContent = div.textContent.trim();
        document.body.style.overflow = 'hidden';
    });
});

function _closePanel() {
    _content.innerHTML = '';
    document.body.style.overflow = '';
}

_backBtn.addEventListener('click', _closePanel);
_backdrop.addEventListener('click', _closePanel);
document.addEventListener('keydown', e => { if (e.key === 'Escape') _closePanel(); });

//////////////////////////////////////////////////////////////


let azkarList = []

let currentAzkarType = "";

let currentDay = new Date().getDay();
let savedDay = localStorage.getItem("day")
const azkarKey = 'Azkar_'

// حذف كل مفاتيح الأذكار عند بداية يوم جديد لإعادة تصفير العدادات
if (savedDay !== null && savedDay != currentDay) {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith(azkarKey)) {
            localStorage.removeItem(key);
        }
    });
}
localStorage.setItem("day", currentDay);



async function getAzkarData() {
    links.forEach(azkar => {
        azkar.addEventListener('click', async () => {
            currentAzkarType = azkar.getAttribute('name');
            let storageAzker = localStorage.getItem(`${azkarKey}${currentAzkarType}`)

            if (storageAzker) {
                azkarList = JSON.parse(storageAzker);
                createAzkarCard(azkarList)
                return;
            }
            else {
                try {
                    const response = await fetch(`${azkarAPI}`);
                    if (!response.ok) {
                        throw (`data isn't found yet , ${response.status}`)
                    }

                    let data = await response.json()
                    azkarList = data[currentAzkarType];
                    createAzkarCard(azkarList)
                    localStorage.setItem(`${azkarKey}${currentAzkarType}`, JSON.stringify(azkarList));

                }

                catch (err) {
                    console.log(err)
                    let storage = localStorage.getItem(`${azkarKey}${currentAzkarType}`)
                    if (!storage && azkarList.length === 0) {
                        let errorDiv = document.createElement('div')
                        errorDiv.className = 'alert alert-danger'
                        errorDiv.textContent = "عذراً لا يوجد بيانات"
                        azkarContent.appendChild(errorDiv)
                    }
                }
            }
        })
    })
}

function createAzkarCard(list) {
    azkarContent.innerHTML = '';
    list.forEach(z => {
        let zekrCount = z.isDone == true ? "تم الانتهاء ✅" : z.count;
        let cursorStyle = z.isDone == true ? "not-allowed" : "pointer";
        azkarContent.innerHTML += `
        <div class="card p-3 my-3" id="${z.id}">
            <div class="card-body">
                <p class="card-text">${z.text}</p>
                <p class='count ps-5 pe-5' style="cursor: ${cursorStyle}">${zekrCount}</p>
            </div>
        </div>
    `
    })
}

getAzkarData();

azkarContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('count')) {

        if (e.target.textContent == "تم الانتهاء ✅") return;

        let count = e.target.textContent;
        let cardId = e.target.closest('.card').id;

        if (count > 0) {
            count--;
            e.target.textContent = count;
            savedNewZekrCount(count, cardId);
        }

        if (count == 0) {
            e.target.style.cursor = "not-allowed";

            let cardId = e.target.closest('.card').id;

            let raw = localStorage.getItem(`${azkarKey}${currentAzkarType}`);
            if (raw) {
                azkarList = JSON.parse(raw);
                let index = azkarList.findIndex(z => z.id == cardId);
                if (index !== -1) {
                    azkarList[index].isDone = true;
                }
                localStorage.setItem(`${azkarKey}${currentAzkarType}`, JSON.stringify(azkarList));
            }

            e.target.innerHTML = `<span>تم الانتهاء ✅</span>`;
        }
    }
})

function savedNewZekrCount(count, cardId){
    let raw = localStorage.getItem(`${azkarKey}${currentAzkarType}`);
    if (!raw) return;
    let storageData = JSON.parse(raw);
    let findCard = storageData.find(i => i.id == cardId)
    if(findCard){
        findCard.count = count;
        localStorage.setItem(`${azkarKey}${currentAzkarType}`, JSON.stringify(storageData));
    }
}


