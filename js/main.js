// navbar
let navHeight = $("nav").outerHeight(true)
$("nav ul.navbar-nav li").not(":last-child, :nth-of-type(7)").click(function (e) {
    e.preventDefault()
    $(this).addClass("active").siblings().removeClass("active")
    let section = $(this).attr("data-section"), 
        secTop = $(`section#${section}`).offset().top
    // console.log(navHeight, navHeight2, secTop, section)
    $(window).scrollTop(secTop - 72)
})

$(window).scroll(function () {
    if ($(this).scrollTop() > 10) {
        $("nav").addClass("active-scroll")
    } else {
        $("nav").removeClass("active-scroll")
    }
    let links = $("nav ul.navbar-nav li[data-section]")
    for (let link of links) {
        let sectionName = $(link).attr("data-section"),
            currentSection = $(`section#${sectionName}`);
        if ($(this).scrollTop() > (currentSection.offset().top - navHeight)) {
            $(link).addClass("active").siblings().removeClass("active")
        }
    }
})

// landing
let windowHeight = $(window).height()
$("section#landing").css({
    height: windowHeight - navHeight,
    marginTop: navHeight,
})

// services
function pReset(paragraph) {
    return paragraph.replace("L10N House", '<span class="special green">L10N <span class="orange">House</span></span>')
}
let servicesData;
$.ajax({
    url: "https://semicode.tech/api/v1/l10nhouse/services",
    type: "GET",
    success: function (data) {
        servicesData = data;
        console.log(data)
        let delay = 0.2;
        servicesData.forEach((item, index) => {
            $("#services .row").append(`
                <div class="col-lg-6 mb-4">
                    <div class="item text-center rounded-3 py-3 wow ${index % 2 == 0 ? "backInLeft" : "backInRight"}" data-wow-delay="${delay}s">
                        <img src="${window.origin}/L10_house_project/img/serv/${item.icon}" alt="" class="img-fluid">
                        <h4>${item.title}</h4>
                        <p>${pReset(item.description.slice(0, 150))}...<span class="read-more" onclick="setDataInPopup(${index})">Read more</span></p>
                    </div>
                </div>
            `)
            delay += 0.2;
        });
        
    }
})

function setDataInPopup(index) {
    let data = servicesData[index],
        section="", point="";
    console.log(data.sections);
    data.sections.forEach(item => {
        item.points.forEach(item => {
            point += `
                <li>${item}</li>
            `
        })
        section += `
            <section class="my-3">
                    <h4>${item.title}</h4>
                    <ol>
                        ${point}
                    </ol>
            </section>
        `
    })
    $(".popup[data-popup='services'] .box .data").html(`
            <h3 class="text-center my-4 orange">${data.title}</h3>
            <div class="container">
                <div class="row m-0">
                    <div class="col-lg-6 mb-3 mb-lg-0">
                        <div class="item info align-items-center d-flex m-0 w-100 ">
                            <p class="m-0">${pReset(data.description)}</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="item img text-center mb-4 mb-lg-0">
                            <img src="${window.origin}/L10_house_project/img/serv-img/${data.img}" alt="" class="img-fluid rounded-3">
                        </div>
                    </div>
                </div>
                ${section}
            </div>
    `)
    openPopup('services')
}

function openPopup(popupName) {
    if (popupName == 'languages') {
        $(`section.popup[data-popup="${popupName}"]`).fadeIn("slow", function () {
            $(`section.popup[data-popup="${popupName}"] .box`).animate({right: 0}, 500)
        })
    } else {
        $(`section.popup[data-popup="${popupName}"]`).fadeIn("slow")
    }
    if(popupName == 'video'){
        $(`section.popup[data-popup="${popupName}"]`).css("display", "flex")
    }
    $("body").css("overflow", "hidden")
}
function closePopup(e, popupName=null) {
    if (popupName == 'languages') {
        $(`section.popup[data-popup="${popupName}"] .box`).animate({ right: "-80%" }, 500, function () {
            $(".popup").fadeOut("slow")
        })
    } else {
        $(".popup").fadeOut("slow")
    }
    $("body").css("overflow", "auto")
}

$(".popup .box").click(function (e) {
    e.stopPropagation()
})

// sectors
$.ajax({
    url: 'https://semicode.tech/api/v1/l10nhouse/sectors',
    type: "GET",
    success: function (data) {
        data.forEach((item) => {
            $(".popup[data-popup='sectors'] .box .row").append(`
                <div class="col-md-6 col-lg-4 col-xl-3 mb-2">
                    <div class="item rounded-3 p-2">
                        <img src="./img/sec/${item.icon}" alt="" class="img-fluid mb-3">
                        <p class="text-center rounded-2 m-0">${item.name}</p>
                    </div>
                </div>
            `)
        })
    }
})

// languages
$.ajax({
    url: 'https://semicode.tech/api/v1/l10nhouse/languages',
    type: "GET",
    success: function (data) {
        data.forEach((item) => {
            let points = "";
            item.languages.forEach((point) => {
                points += `<li><i class="fa-regular fa-circle-dot me-2"></i>${point}</li>`
            })
            $(".popup[data-popup='languages'] .box .data").append(`
                <ul class="list-unstyled">
                    <h2>${item.continent}</h2>
                    ${points}
                </ul>
            `)
        })
    }
})

// up
$(window).scroll((e) => {
    if ($(this).scrollTop() > 50) {
        $(".up").css("right","-55px")
    } else {
        $(".up").css("right","-100px")
    }
})
$(".up").click(() => {
    $(window).scrollTop(0)
})

// loading
$(window).on("load", function () {
    $("#loading").fadeOut("slow");
    $("body").css({
        "overflow-x": "hidden",
        "overflow-y": "auto"
    })
})
