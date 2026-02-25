// Search Suggestions Implementation

const suggestWords = [
    "เส้น", "สี", "รูปทรง", "รูปทรงตัน", "พื้นผิว", "เนื้อ",
    "แบบฝึกหัดที่1", "แบบฝึกหัดที่2", "แบบฝึกหัดที่3",
    "แบบฝึกหัดที่4", "แบบฝึกหัดที่5", "แบบฝึกหัดที่6",
    "บทที่1", "บทที่2", "บทที่3", "บทที่4", "บทที่5"
];

function showSuggestions() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let list = document.getElementById("suggestionList");

    list.innerHTML = "";

    if (input === "") {
        list.style.display = "none";
        return;
    }

    let matched = suggestWords.filter(w => w.includes(input));

    if (matched.length === 0) {
        list.style.display = "none";
        return;
    }

    matched.forEach(word => {
        let li = document.createElement("li");
        li.innerText = word;
        li.onclick = () => {
            document.getElementById("searchInput").value = word;
            list.style.display = "none";
            goSearch();
        };
        list.appendChild(li);
    });

    list.style.display = "block";
}

function goSearch() {
    let keyword = document.getElementById("searchInput").value.toLowerCase();

    if (keyword.includes("เส้น")) {
        window.location.href = "https://lersros-lookchin.my.canva.site/dag-iij7i8k";
    }
    else if (keyword.includes("สี")) {
        window.location.href = "https://lersros-lookchin.my.canva.site/color";
    }
    else if (keyword.includes("รูปทรง")) {
        window.location.href = "https://lersros-lookchin.my.canva.site/shape-form";
    }
    else if (keyword.includes("พื้นผิว")) {
        window.location.href = "https://lersros-lookchin.my.canva.site/line";
    }
    else if (keyword.includes("รูปทรงตัน")) {
        window.location.href = "https://lersros-lookchin.my.canva.site/form";
    }
    else if (keyword.includes("เนื้อ")) {
        window.location.href = "https://lersros-lookchin.my.canva.site/value";
    }
    else if (keyword.includes("แบบฝึกหัดที่1")) {
        window.location.href = "แบบฝึกหัด1.html";
    }
    else if (keyword.includes("แบบฝึกหัดที่2")) {
        window.location.href = "แบบฝึกหัด2.html";
    }
    else if (keyword.includes("แบบฝึกหัดที่3")) {
        window.location.href = "แบบฝึกหัด3.html";
    }
    else if (keyword.includes("แบบฝึกหัดที่4")) {
        window.location.href = "แบบฝึกหัด4.html";
    }
    else if (keyword.includes("แบบฝึกหัดที่5")) {
        window.location.href = "แบบฝึกหัด5.html";
    }
    else if (keyword.includes("แบบฝึกหัดที่6")) {
        window.location.href = "แบบฝึกหัด6.html";
    }
    else if (keyword.includes("บทที่1")) {
        window.location.href = "https://lersros-lookchin.my.canva.site/1";
    }
    else if (keyword.includes("บทที่2")) {
        window.location.href = "https://lersros-lookchin.my.canva.site/archival-palette";
    }
    else if (keyword.includes("บทที่3")) {
        window.location.href = "https://lersros-lookchin.my.canva.site/dahaaz35ibu";
    }
    else if (keyword.includes("บทที่4")) {
        window.location.href = "https://lersros-lookchin.my.canva.site/4";
    }
    else if (keyword.includes("บทที่5")) {
        window.location.href = "https://lersros-lookchin.my.canva.site/5";
    }
    else {
        alert("ไม่พบข้อมูลที่ค้นหา");
    }
}
