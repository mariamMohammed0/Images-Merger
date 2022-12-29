const image = document.getElementById('image');
const image2 = document.getElementById('image2');
const custom_btn = document.getElementById('custom_btn')
const custom_btn2 = document.getElementById('custom_btn2');
const cropper = new Cropper(image, { zoomable: 0, aspectRatio: 0, viewMode: 0, });
const cropper2 = new Cropper(image2, { zoomable: 0, aspectRatio: 0, viewMode: 0, });

const mag1_radio = document.getElementById('img1_mag');
const phase1_radio = document.getElementById('img1_phase');
mag1_radio.checked = true;

const mag2_radio = document.getElementById('img2_mag');
const phase2_radio = document.getElementById('img2_phase');
phase2_radio.checked = true;

//phase =1, Mag=0
var check = 0;
// var check1 = 0;
var picture1 = 0;
var picture2 = 1;
var picture_phase=0;
var flag =true;

if (flag== true)
{
    // console.log('true');
    images_processing();
    flag=false;
}

document.getElementById('pic1').addEventListener('click', function () {
    // console.log('ajax pic1')
    images_processing()
});


document.getElementById('pic2').addEventListener('click', function () {
    // console.log('ajax pic2')
    images_processing();
});

document.getElementById('img1_radiobtn').addEventListener('click', function () {

    radiobtn = document.querySelector('input[name="pic1_radio"]:checked').value;
    // console.log(radiobtn)
    if (radiobtn!=picture1)
        {
        if (radiobtn==0)
        {
            phase2_radio.checked = true;
            mag2_radio.checked = false;
            picture1=0;
            picture2=1;
        }
        else if (radiobtn==1)
        {
            phase2_radio.checked = false;
            mag2_radio.checked = true;
            picture1=1;
            picture2=0;
        }

        // console.log('ajax rb1')
        images_processing()           
    } 
});

document.getElementById('img2_radiobtn').addEventListener('click', function () {

    radiobtn = document.querySelector('input[name="pic2_radio"]:checked').value;
    // console.log(radiobtn)
    if (radiobtn!=picture2)
    {
        if (radiobtn==0)
        {
            phase1_radio.checked = true;
            mag1_radio.checked = false;
            picture1=1;
            picture2=0;
        }
        else if (radiobtn==1)
        {
            phase1_radio.checked = false;
            mag1_radio.checked = true;
            picture1=0;
            picture2=1;
        }

        // console.log('ajax rb2')
        images_processing()
    }
});


function images_processing() 
{
    // console.log("picture1");
    // console.log(picture1);
    // console.log("picture2");
    // console.log(picture2);
    // console.log("check");
    // console.log(check);
    // console.log("picture_phase");
    // console.log(picture_phase)
    // console.log('proccesing')
    var data2 = cropper2.getCropBoxData();
    var data = cropper.getCropBoxData();
    if (Object.keys(data).length==0)
    {
        data= { 'left': 50, 'top': 30, 'width': 400, 'height':240 };
    }
    if (Object.keys(data2).length==0)
    {
        data2= { 'left': 50, 'top': 30, 'width': 400, 'height':240 };
    }
    // console.log(Object.keys(data).length)
    // var c1 =  document.querySelector('input[name="pic1_radio"]:checked').value;
    // var c2 = document.querySelector('input[name="pic2_radio"]:checked').value;

    if (picture1==0 && check==1)
    {
        picture_phase=1;
        // console.log("pic_1 mag");
    }
    else if (picture2==0 && check==1)
    {
        picture_phase=2;
        // console.log("pic_2 mag");
    }

    var pictures = { "pic1": data, "pic2": data2, "pic1_choice": picture1, "pic2_choice": picture2, "outside": check};

    // console.log(pictures)
    $.ajax({
        url: "/crop_image1",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(pictures),
        success: function () {
            var d = new Date();
            var image1 = "../static/assets/images/outputs/output_image1.png?" + d.getMilliseconds();
            var image2 = "../static/assets/images/outputs/output_image2.png?" + d.getMilliseconds();

            $(".img1").attr("src", image1);
            $(".img2").attr("src", image2);
            // console.log('proccesing')
        }
        // ,error: (error) =>
        // {
        //     console.log(JSON.stringify(error))
        // }
    });
}








const upload_btn = document.getElementById('image_uploads');
upload_btn.addEventListener('change', updateImageDisplay);
function updateImageDisplay() {

    const curFiles = upload_btn.files;
    file_name = curFiles[0].name;
    // console.log(curFiles[0].name)
    var picture = { "pic": file_name, "index": 0 };
    // console.log('ajax save 1')
    $.ajax({
        url: "/save_image",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(picture),
    });
    flag=true;
    location.reload()
    
}
const upload_btn2 = document.getElementById('image_uploads2');
upload_btn2.addEventListener('change', updateImageDisplay2);
function updateImageDisplay2() {

    const curFiles2 = upload_btn2.files;
    file_name2 = curFiles2[0].name;
    // console.log('ajax save 2')
    var picture = { "pic": file_name2, "index": 1 };
    $.ajax({
        url: "/save_image",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(picture),
    });
    images_processing()
    location.reload()
    

}
custom_btn.addEventListener('click', function () {
    upload_btn.click();
    // images_processing()
})
custom_btn2.addEventListener('click', function () {
    upload_btn2.click();
    // images_processing()
}

)

document.getElementById('outside').addEventListener('click', function () {

    radiobtn = document.querySelector('input[name="out_side"]:checked');
    // console.log('radiobtn')
    if (radiobtn==null) 
    {
        check=0;
        console.log(check)

    }
    else
    {
        // console.log(radiobtn)
        check = 1;
        console.log(check)
    }
    images_processing()
});

// document.getElementById('uniform_phase').addEventListener('click', function () {

//     radiobtn = document.querySelector('input[name="uniform"]:checked');
//     // console.log(radiobtn)
//     if (radiobtn==null) 
//     {
//         check1=0;
//         // console.log(check)

//     }
//     else
//     {
//         // console.log(radiobtn)
//         check1 = 1;
//         // console.log(check)
//     }
//     images_processing()
// });


// function get_uniform_value()
// {
//     radiobtn = document.querySelector('input[name="pic2_radio"]:checked').value;
//     console.log(radiobtn)
//     if (radiobtn==0)
//     {
//         phase1_radio.checked = true;
//         mag1_radio.checked = false;
//     }
//     else if (radiobtn==1)
//     {
//         phase1_radio.checked = false;
//         mag1_radio.checked = true;
//     }
// }