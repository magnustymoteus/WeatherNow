let weather = document.getElementById('weather');
let bgDg = document.getElementsByClassName('degree');
let managerBtn = document.getElementById('managerBtn');
let manager = document.getElementById('manager');
class WeatherBlock {
    static blockAm = 0;
    static maxBlocksAllowed = 4;
    constructor(part, dg, wType, rainType) {
        this.part = part;
        this.dg = dg;
        this.wType = wType;
        this.rainType = rainType;
        WeatherBlock.blockAm++;
    }
    static getExistingBlocks = () => {
        let blocks = document.getElementsByClassName('weather-table');
        let blockArr = new Array();
        for(let i=0;i<blocks.length;i++) {
            let block = new WeatherBlock(document.getElementsByClassName('part')[i].textContent,document.getElementsByClassName('degree')[i].textContent,document.getElementsByClassName('wType')[i].textContent,document.getElementsByClassName('rainType')[i].textContent);
            blockArr.push(block);
        }
        return blockArr;
    }
}
class Manager {
    constructor() {
        this.canToggle = true;
        this.managerBtnToggle = false;
        let weatherBlocks = WeatherBlock.getExistingBlocks(); 
        let updateBtn = document.createElement("p");
        updateBtn.id = "updateBtn";
        updateBtn.innerText = "Update";
        for(let i=0;i<weatherBlocks.length;i++) {
            let div = document.createElement('div');
            div.className = "managerBlock";
            let block = document.createElement('p');
            block.className = "pNoline";
            let blockName = document.createTextNode(`${i+1}:`);
            block.appendChild(blockName);
            div.appendChild(block);
            let txt = [weatherBlocks[i].dg, weatherBlocks[i].wType, weatherBlocks[i].rainType];
            for(let j=0;j<3;j++) {
                let input = document.createElement('input');
                input.placeholder = (!j)?"Degrees (C)":(j==1)?"Weather Type":"Rain Chance (%)";
                input.type = (!j || j===2)?"number":"text";
                input.id = `block${i+1}/${j+1}`;
                input.name = input.id;
                input.value = (txt[j].match(/\d+/))?txt[j].match(/\d+/)[0]:txt[j];
                div.appendChild(input);
            }
            manager.appendChild(div);      
        }
        manager.appendChild(updateBtn);
    }
    clickBtn = () => {
        if(!this.managerBtnToggle && this.canToggle) {   
            this.canToggle = false; 
            manager.style.visibility = "visible";
            manager.style.opacity = "1";
            setTimeout(() => {
                this.managerBtnToggle = true; 
                this.canToggle = true;
            }, 2000);
        }
        else if(this.managerBtnToggle && this.canToggle) {
            this.canToggle = false;
            manager.style.opacity = "0";
            setTimeout(() => {
                manager.style.visibility = "hidden";
                this.managerBtnToggle = false;
                this.canToggle = true;
            }, 2000);
        }  
    }
    updateBlocks = () => {
        for(let i=0;i<WeatherBlock.getExistingBlocks().length;i++) {
            let dg = document.getElementById(`block${i+1}/1`).value;
            let wType = document.getElementById(`block${i+1}/2`).value;
            let rainChance = document.getElementById(`block${i+1}/3`).value;
            document.getElementsByClassName('degree')[i].innerText = `${dg}°`;
            document.getElementsByClassName('wType')[i].innerText = wType;
            document.getElementsByClassName('rainType')[i].innerText = (!rainChance.length)?"Rain Chance: --":`Rain Chance: ${rainChance}%`;
        }
        for(let i=0;i<bgDg.length;i++) {
            let dg = Number(bgDg[i].textContent.match(/\d+/)[0]);
            bgDg[i].style.backgroundColor = (dg<=-10)?"rgba(0, 124, 214, 0.57)":(dg<=0 && dg>-10)?"rgba(0, 124, 249, 0.21)":(dg<=10 && dg>0)?"rgba(0, 143, 9, 0.21)":(dg<=20 && dg>10)?"rgba(0, 143, 9, 0.37)":(dg<=30 && dg>20)?"rgba(253, 143, 9, 0.36)":"rgba(253, 0, 0, 0.52)";
        }
    }
}
var managerClass = new Manager(); 
let updateBtn = document.getElementById('updateBtn');
for(let i=0;i<bgDg.length;i++) {
    let dg = Number(bgDg[i].textContent.match(/\d+/)[0]);
    bgDg[i].style.backgroundColor = (dg<=-10)?"rgba(0, 124, 214, 0.57)":(dg<=0 && dg>-10)?"rgba(0, 124, 249, 0.21)":(dg<=10 && dg>0)?"rgba(0, 143, 9, 0.21)":(dg<=20 && dg>10)?"rgba(0, 143, 9, 0.37)":(dg<=30 && dg>20)?"rgba(253, 143, 9, 0.36)":"rgba(253, 0, 0, 0.52)";
}
managerBtn.onclick = () => managerClass.clickBtn();
updateBtn.onclick = () => managerClass.updateBlocks();