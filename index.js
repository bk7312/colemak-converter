

const $qwerty = document.querySelector('#qwerty')
const $colemak = document.querySelector('#colemak')

$qwerty.addEventListener('input', () => toColemak())
$colemak.addEventListener('input', () => toQwerty())

const qwertyStr  = "qwertyuiopasdfghjkl;zxcvbnmQWERTYUIOPASDFGHJKL:ZXCVBNM"
const colemakStr = "qwfpgjluy;arstdhneiozxcvbkmQWFPGJLUY:ARSTDHNEIOZXCVBKM"

function toColemak() {
    $colemak.value = convert($qwerty.value, colemakStr, qwertyStr)
}

function toQwerty() {
    $qwerty.value = convert($colemak.value, qwertyStr, colemakStr)
}

function convert(str, strTo, strFrom) {
    let res = ""
    for(let char of str) {
        const index = strFrom.indexOf(char)
        res += index >= 0 ? strTo[index] : char
    }
    return res
}
