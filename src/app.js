import Simulation from './simulation';
import data from './dummy.json';



    let simulation   = new Simulation({ x:5, y:5 });
    const textarea     = document.getElementById('commands');
    const button       = document.getElementById('process');
    const output       = document.getElementById('output');
    const event_btns = document.querySelectorAll('.example');

    const processInput = () => {
        simulation.process(textarea.value);
        output.textContent = simulation.getOutput();
    }
    
    const loadExample = (e) => {
        let key = e.target.getAttribute('data-example');
        textarea.value = data[key].input;
    }
    
    // bind process button
    button.addEventListener('click', processInput);
    
    // bind each example button
    for (let i = 0; i < event_btns.length; i++) {
        event_btns[i].addEventListener('click', loadExample);
    }
    
    // load first example on load
    textarea.value = data.first.input;