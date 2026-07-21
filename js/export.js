/*
=========================================
 VM PROVISION CSV EXPORT
=========================================
*/


document.addEventListener(
"DOMContentLoaded",
function(){


    const provisionButton =
    document.getElementById(
        "provisionBtn"
    );



    if(provisionButton){


        provisionButton.addEventListener(
            "click",
            exportCSV
        );


    }


});









/*
=========================================
 EXPORT CSV
=========================================
*/


function exportCSV(){



    const cards =
    document.querySelectorAll(
        ".vm-card"
    );



    let vmList = [];

    let maxDiskCount = 0;









    cards.forEach(
    card=>{



        const vmName =
        card.querySelector(
            ".vmName"
        ).value.trim();




        const ipAddress =
        card.querySelector(
            ".ipAddress"
        ).value.trim();





        const os =
        card.querySelector(
            ".os"
        ).value;






        const cpu =
        card.querySelector(
            ".cpu"
        ).value.trim();







        const ram =
        card.querySelector(
            ".ram"
        ).value.trim();








        const disks =
        Array.from(
            card.querySelectorAll(
                ".disk-size"
            )
        )
        .map(
            disk =>
            disk.value.trim()
        );








        if(
            vmName === "" ||
            ipAddress === "" ||
            os === "" ||
            cpu === "" ||
            ram === ""
        ){


            alert(
            "Please complete all VM information."
            );


            throw new Error(
            "Missing VM information"
            );


        }







        if(
            disks.length < 3
        ){


            alert(
            "Every VM requires C:, D:, and E: disks."
            );


            throw new Error(
            "Missing disks"
            );


        }







        for(
            let disk of disks
        ){


            if(disk === ""){


                alert(
                "Please enter all disk sizes."
                );


                throw new Error(
                "Empty disk"
                );


            }


        }








        if(
            disks.length >
            maxDiskCount
        ){


            maxDiskCount =
            disks.length;


        }








        vmList.push({

            vmName,

            ipAddress,

            os,

            cpu,

            ram,

            disks

        });




    });








    /*
    CSV HEADER
    */


    let headers = [


        "VM Name",

        "IP Address",

        "Operating System",

        "CPU (vCPU)",

        "RAM (GB)"


    ];








    for(
        let i = 0;
        i < maxDiskCount;
        i++
    ){


        headers.push(

            String.fromCharCode(
                67 + i
            ) + ":"

        );


    }









    let csvRows = [];



    csvRows.push(headers);









    /*
    CSV DATA
    */


    vmList.forEach(
    vm=>{


        let row = [


            vm.vmName,

            vm.ipAddress,

            vm.os,

            vm.cpu,

            vm.ram


        ];








        vm.disks.forEach(
        disk=>{


            row.push(
                disk + "GB"
            );


        });







        csvRows.push(row);



    });









    const csvContent =

    csvRows
    .map(
        row =>

        row
        .map(
            value =>

            `"${value}"`

        )
        .join(",")

    )
    .join("\n");









    downloadCSV(

        csvContent,

        "VM_Provisioning_Request.csv"

    );



}









/*
=========================================
 DOWNLOAD CSV
=========================================
*/


function downloadCSV(
    csv,
    filename
){



    const blob =
    new Blob(

        [csv],

        {

            type:
            "text/csv;charset=utf-8;"

        }

    );






    const url =
    URL.createObjectURL(
        blob
    );







    const link =
    document.createElement(
        "a"
    );






    link.href =
    url;






    link.download =
    filename;







    document.body.appendChild(
        link
    );







    link.click();







    document.body.removeChild(
        link
    );







    URL.revokeObjectURL(
        url
    );



}