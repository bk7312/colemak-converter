
const $html = document.querySelector('html')
const $banner = document.querySelector('#banner')
const $bannerText = document.querySelector('#banner-text')
const $closeBannerBtn = document.querySelector('#close-banner')
const $qwerty = document.querySelector('#qwerty')
const $colemak = document.querySelector('#colemak')
const $qwertyCopyBtn = document.querySelector('#copy-qwerty')
const $colemakCopyBtn = document.querySelector('#copy-colemak')

$html.addEventListener('keydown', keyboardCopy)
$qwerty.addEventListener('input', toColemak)
$colemak.addEventListener('input', toQwerty)
$qwertyCopyBtn.addEventListener('click', () => copyText($qwerty.value))
$colemakCopyBtn.addEventListener('click', () => copyText($colemak.value))
$closeBannerBtn.addEventListener('click', closeBanner)

const qwertyStr = "qwertyuiopasdfghjkl;zxcvbnmQWERTYUIOPASDFGHJKL:ZXCVBNM"
const colemakStr = "qwfpgjluy;arstdhneiozxcvbkmQWFPGJLUY:ARSTDHNEIOZXCVBKM"

let bannerTimeout

function toColemak() {
    $colemak.value = convert($qwerty.value, colemakStr, qwertyStr)
}

function toQwerty() {
    $qwerty.value = convert($colemak.value, qwertyStr, colemakStr)
}

function convert(str, strTo, strFrom) {
    let res = ""
    for (let char of str) {
        const index = strFrom.indexOf(char)
        res += index >= 0 ? strTo[index] : char
    }
    return res
}

async function copyText(str) {
    const text = str.trim()
    if (text === '') {
        showBanner('Nothing to copy...', 'notOk')
        return
    }
    try {
        await navigator.clipboard.writeText(text)
        const bannerText = text.length < 50 ? text : text.slice(0, 50).trim() + '...'
        showBanner(`"${bannerText}" copied to clipboard!`, 'ok')
    } catch (e) {
        showBanner(`${e.name}: ${e.message}`, 'notOk')
    }
}

async function keyboardCopy(e) {
    if (e.ctrlKey && e.shiftKey && e.altKey) {
        const target = e.target.id === 'qwerty' ?
            $colemak.value
            : e.target.id === 'colemak' ?
                $qwerty.value : ''
        copyText(target)
    }
}

function showBanner(str, type = 'ok') {
    clearTimeout(bannerTimeout)
    $bannerText.textContent = str
    $banner.style.background = type === 'ok' ? 'lime' : 'salmon'
    $banner.classList.remove('hide')
    $closeBannerBtn.classList.remove('hide')
    bannerTimeout = setTimeout(() => closeBanner(), 3000)
}

function closeBanner() {
    $banner.classList.add('hide')
}

const url = new URL(window.location.href)
const params = new URLSearchParams(url.search)

if (params.has('q')) {
    $qwerty.value = params.get('q')
    toColemak()
    $qwerty.focus()
    copyText($colemak.value)
} else if (params.has('c')) {
    $colemak.value = params.get('c')
    toQwerty()
    $colemak.focus()
    copyText($qwerty.value)
} else {
    $qwerty.focus()
}