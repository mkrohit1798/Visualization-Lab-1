var MinOS = []; //categorical vars
var RecOS = []; //categorical vars
var MinDirectX = []; //categorical vars
var MinHDD = []; //categorical vars
var RecHDD = []; //categorical vars

var RecCPUtemp =[];
var MinCPULitho = [];
var MinCPUCores = [];
var RecCPUSpeed = [];
var RecCPULitho = [];
var MinGPUmemory = [];
var MinGPUMemSpeed = [];

var MinGPUPixelRate = [];
var MinGPUTexRate = [];
var MinGPUMemBWidth = [];

var currentBinValue = 20;

d3.csv("PC_games_requirements_final.csv", function(data){
    data.forEach((d)=>{  
    //Name.push(d['Name']); // unique Names, so not required for bar chart

    // numeric variables
    RecCPUtemp.push(+d.Recom_CPU_Max_Temp);
    MinCPULitho.push(+d.Min_CPU_Lithography);
    MinCPUCores.push(+d.Min_CPU_Physical_Cores);
    RecCPUSpeed.push(+d.Recom_CPU_CPU_Speed);
    RecCPULitho.push(+d.Recom_CPU_Lithography);
    MinGPUmemory.push(+d.Min_GPU_Memory);
    MinGPUMemSpeed.push(+d.Min_GPU_Memory_Speed);
    MinGPUPixelRate.push(+d.Min_GPU_Pixel_Rate);
    MinGPUTexRate.push(+d.Min_GPU_Texture_Rate);
    MinGPUMemBWidth.push(+d.Min_GPU_Memory_Bandwidth);
    
    // categorical variables
    MinOS.push(d['Min_OS']);
    RecOS.push(d['Recom_OS']);
    MinDirectX.push(d['Min_Direct_X']);
    MinHDD.push(d['Min_HDD_Space']);
    RecHDD.push(d['Recom_HDD_Space']);

    });
    // console.log("Min OS:", MinOS);
    // console.log("Reqd OS:", RecOS);
    // console.log("Reqd DX:", MinDirectX);
    // console.log("Min DISK:", MinHDD);
    // console.log("Pref DISK:", RecHDD);

    // console.log("pref CPU temp:",RecCPUtemp); dd
    // console.log("reqd CPU litho:",MinCPULitho); dd
    // console.log("reqd CPU cores:",MinCPUCores); dd
    // console.log("pref CPU speed:",RecCPUSpeed); dd
    // console.log("pref CPU litho:",RecCPULitho); dd
    // console.log("GPU memory:",MinGPUmemory); dd
    // console.log("GPU Mem Speed:",MinGPUMemSpeed); dd
    // console.log("GPU Pixel rate:",MinGPUPixelRate); dd
    // console.log("GPU B/W:", MinGPUMemBWidth); dd
    // console.log("Texture rate:",  MinGPUTexRate); dd
    
    

    function reqGPUTex(){
        var str = "Min_GPU_Texture_Rate";
        //console.log(MinGPUTexRate, str, nbins);
        d3.select("#nbins").on("input", function(){
            currentBinValue = +this.value
            histogramPlot(MinGPUTexRate, str, currentBinValue);
        });
        
    }
    function reqGPUBWidth(){
        var str = "Min_GPU_Memory_Bandwidth";
        //console.log(MinGPUMemBWidth, str, nbins);
        d3.select("#nbins").on("input", function(){
            currentBinValue = +this.value
            histogramPlot(MinGPUMemBWidth, str, currentBinValue);
        });
        
    }
    function reqGPUPixelRate(){
        var str = "Min_GPU_Pixel_Rate";
        //console.log(MinGPUPixelRate, str, nbins);
        d3.select("#nbins").on("input", function(){
            currentBinValue = +this.value
            histogramPlot(MinGPUPixelRate, str, currentBinValue);
        });
        
    }
    function reqGPUMemSpeed(){
        var str = "Min_GPU_Memory_Speed";
        //console.log(MinGPUMemSpeed, str, nbins);
        d3.select("#nbins").on("input", function(){
            currentBinValue = +this.value
            histogramPlot(MinGPUMemSpeed, str, currentBinValue);
        });
        
    }
    function reqGPUMem(){
        var str = "Min_GPU_Memory";
        //console.log(MinGPUmemory, str, nbins);
        d3.select("#nbins").on("input", function(){
            currentBinValue = +this.value
            histogramPlot(MinGPUmemory, str, currentBinValue);
        });
        
    }
    function CPUtemp(){
        var str = "Recom_CPU_Max_Temp";
        //console.log(RecCPUtemp, str, nbins);
        d3.select("#nbins").on("input", function(){
            currentBinValue = +this.value
            histogramPlot(RecCPUtemp, str, currentBinValue);
        });
        
    }
    function reqlitho(){
        var str = "Min_CPU_Lithography";
        //console.log(MinCPULitho, str, nbins);
        d3.select("#nbins").on("input", function(){
            currentBinValue = +this.value
            histogramPlot(MinCPULitho, str, currentBinValue);
        });
        
    }
    function preflitho(){
        var str = "Recom_CPU_Lithography";
        //console.log(RecCPULitho, str, nbins);
        d3.select("#nbins").on("input", function(){
            currentBinValue = +this.value
            histogramPlot(RecCPULitho, str, currentBinValue);
        });
        
    }
    function reqdCores(){
        var str = "Min_CPU_Physical_Cores";
        //console.log(MinCPUCores, str, nbins);
        d3.select("#nbins").on("input", function(){
            currentBinValue = +this.value
            histogramPlot(MinCPUCores, str, currentBinValue);
        });
        
    }
    function prefCPUSpeed(){
        var str = "Recom_CPU_CPU_Speed";
        //console.log(RecCPUSpeed, str, nbins);
        d3.select("#nbins").on("input", function(){
            currentBinValue = +this.value
            histogramPlot(RecCPUSpeed, str, currentBinValue);
        });
        
    }


    $("#barhistselector").on("change", function(){
        var node = document.getElementById('barhistselector');
        var drop_down_selected = node.options[node.selectedIndex].value;
        console.log(drop_down_selected);

        if(!$(this).is(':checked')){
            function minDX(){
                var str = "Min_Direct_X";
                bar_plot(str);
            }
            function reqOS(){
                var str = "Min_OS";
                bar_plot(str);
            }
            function recomOS(){
                var str = "Recom_OS";
                bar_plot(str);
            }
            function minDisk(){
                var str = "Min_HDD_Space";
                bar_plot(str);
            }
            function recDisk(){
                var str = "Recom_HDD_Space";
                bar_plot(str);
            }
            
        }
        else{
            function minDX(){
                var str = "Min_Direct_X";
                re_plot(str);
            }
            function reqOS(){
                var str = "Min_OS";
                re_plot(str);
            }
            function recomOS(){
                var str = "Recom_OS";
                re_plot(str);
            }
            function minDisk(){
                var str = "Min_HDD_Space";
                re_plot(str);
            }
            function recDisk(){
                var str = "Recom_HDD_Space";
                re_plot(str);
            }
            
        }
        if(drop_down_selected == "Recom_CPU_Max_Temp"){
            CPUtemp();
        }
        else if(drop_down_selected === "Min_CPU_Lithography"){
            reqlitho();
        }
        else if(drop_down_selected === "Recom_CPU_Lithography"){
            preflitho();
        }
        else if(drop_down_selected === "Min_CPU_Physical_Cores"){
            reqdCores();
        }
        else if(drop_down_selected === "Recom_CPU_CPU_Speed"){
            prefCPUSpeed();
        }
        else if(drop_down_selected === "Min_GPU_Memory"){
            reqGPUMem();
        }
        else if(drop_down_selected === "Min_GPU_Memory_Speed"){
            reqGPUMemSpeed();
        }
        else if(drop_down_selected === "Min_GPU_Texture_Rate"){
            reqGPUTex();
        }
        else if(drop_down_selected === "Min_GPU_Memory_Bandwidth"){
            reqGPUBWidth();
        }
        else if(drop_down_selected === "Min_GPU_Pixel_Rate"){
            reqGPUPixelRate();
        }
        else if(drop_down_selected === "Min_Direct_X"){
            minDX();
        }
        else if(drop_down_selected === "Min_OS"){
            reqOS();
        }
        else if(drop_down_selected === "Recom_OS"){
            recomOS();
        }
        else if(drop_down_selected === "Min_HDD_Space"){
            minDisk()
        }
        else if(drop_down_selected === "Recom_HDD_Space"){
            recDisk();
        }
        
         

        function toggle_switch(){
            switchstatus = $(this).is(':checked');
            return switchstatus
        }
        
    })

    $("#toggle_bar").on("change", function(){
        var drop_down_selected = document.getElementById("barhistselector").value;

        if(!$(this).is(':checked')){
            function minDX(){
                var str = "Min_Direct_X";
                bar_plot(str);
            }
            function reqOS(){
                var str = "Min_OS";
                bar_plot(str);
            }
            function recomOS(){
                var str = "Recom_OS";
                bar_plot(str);
            }
            function minDisk(){
                var str = "Min_HDD_Space";
                bar_plot(str);
            }
            function recDisk(){
                var str = "Recom_HDD_Space";
                bar_plot(str);
            }
            

            if(drop_down_selected === "Min_Direct_X"){
                minDX();
            }
            else if(drop_down_selected === "Min_OS"){
                reqOS();
            }
            else if(drop_down_selected === "Recom_OS"){
                recomOS();
            }
            else if(drop_down_selected === "Min_HDD_Space"){
                minDisk()
            }
            else if(drop_down_selected === "Recom_HDD_Space"){
                recDisk();
            }
            
        }
        else{
            function minDX(){
                var str = "Min_Direct_X";
                re_plot(str);
            }
            function reqOS(){
                var str = "Min_OS";
                re_plot(str);
            }
            function recomOS(){
                var str = "Recom_OS";
                re_plot(str);
            }
            function minDisk(){
                var str = "Min_HDD_Space";
                re_plot(str);
            }
            function recDisk(){
                var str = "Recom_HDD_Space";
                re_plot(str);
            }
            

            if(drop_down_selected === "Min_Direct_X"){
                minDX();
            }
            else if(drop_down_selected === "Min_OS"){
                reqOS();
            }
            else if(drop_down_selected === "Recom_OS"){
                recomOS();
            }
            else if(drop_down_selected === "Min_HDD_Space"){
                minDisk()
            }
            else if(drop_down_selected === "Recom_HDD_Space"){
                recDisk();
            }
            
        }
        
        
    })
});
