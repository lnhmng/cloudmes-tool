const translations = {
    vi: {
        title: "Tool thêm dấu nháy đơn SQL-Thiết kế bởi VNIT",
        placeholderInput: "Dán danh sách vào đây...\na 001\n A 002 ",
        placeholderOutput: "Kết quả sẽ hiện ở đây...",
        lblRemoveSpace: "Xóa mọi dấu cách",
        lblToUppercase: "Chuyển sang CHỮ HOA",
        btnConvert: "Chuyển đổi >>",
        btnRevert: "<< Khôi phục",
        btnClear: "✖ Xóa hết",
        lblCountInput: "Số lượng (Input):",
        lblCountOutput: "Số lượng (Output):"
    },
    cn: {
        title: "SQL 单引号添加工具-CESBG VNIT",
        placeholderInput: "请在此粘贴列表...\na 001\n A 002 ",
        placeholderOutput: "结果显示在这里...",
        lblRemoveSpace: "去除所有空格",
        lblToUppercase: "转为大写字母",
        btnConvert: "转换 >>",
        btnRevert: "<< 还原",
        btnClear: "✖ 清空",
        lblCountInput: "数量 (Input):",
        lblCountOutput: "数量 (Output):"
    }
};

function changeLanguage() {
    const lang = document.getElementById('langSelector').value;
    const t = translations[lang];

    document.getElementById('lblTitle').innerText = t.title;
    document.getElementById('lblRemoveSpace').innerText = t.lblRemoveSpace;
    document.getElementById('lblToUppercase').innerText = t.lblToUppercase;
    document.getElementById('btnConvert').innerText = t.btnConvert;
    document.getElementById('btnRevert').innerText = t.btnRevert;
    document.getElementById('btnClear').innerText = t.btnClear;
    document.getElementById('lblCountInput').innerText = t.lblCountInput;
    document.getElementById('lblCountOutput').innerText = t.lblCountOutput;
    document.getElementById('input').placeholder = t.placeholderInput;
    document.getElementById('output').placeholder = t.placeholderOutput;
}

function countLines(text) {
    if (!text) return 0;
    return text.split('\n').map(x => x.trim()).filter(x => x !== '').length;
}

function updateLineCounts() {
    const textIn = document.getElementById('input').value;
    const textOut = document.getElementById('output').value;
    document.getElementById('cntInput').innerText = countLines(textIn);
    document.getElementById('cntOutput').innerText = countLines(textOut);
}

function convert() {
    const raw = document.getElementById('input').value;
    const removeAllSpace = document.getElementById('chkRemoveAllSpace').checked;
    const toUppercase = document.getElementById('chkToUppercase').checked;

    let lines = raw.split('\n')
        .map(x => {
            if (removeAllSpace) x = x.replace(/\s/g, '');
            else x = x.trim();

            if (toUppercase) x = x.toUpperCase();
            return x;
        })
        .filter(x => x !== '');

    if (lines.length === 0) {
        document.getElementById('output').value = '';
        updateLineCounts();
        return;
    }

    const result = lines.map(x => `'${x}'`).join(',\n');
    document.getElementById('output').value = result;
    updateLineCounts();
}

function revert() {
    const raw = document.getElementById('output').value;
    const result = raw.replace(/'/g, '').replace(/,/g, '');
    document.getElementById('input').value = result;
    updateLineCounts();
}

function clearAll() {
    document.getElementById('input').value = '';
    document.getElementById('output').value = '';
    updateLineCounts();
    document.getElementById('input').focus();
}