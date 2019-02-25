import * as parser from './parser';



const Simulation = (size) => {
    const sizes       = size || { x:5, y:5 };
    let position    = null;
    let output      = [];

    const COMPASS = [
        'NORTH',
        'EAST',
        'SOUTH',
        'WEST'
    ];

    return {

        process: (input) => {
            console.log('comand', parser);
            // parses raw command input and performs commands

            let commands = parser.getCommands(input, size);
            let method   = '';

            this.reset();

            for (let i = 0; i < commands.length; i++) {
                method = commands[i].split(' ')[0].toLowerCase();
                this[method](commands[i]); // command names map to method names
            };
        },

        reset: () => {
            position = null;
            output = [];
        },

        place: (command) => {
            position = parser.getPlaceData(command);
        },

        move: () => {
            switch (position.f) {
                case 'NORTH':
                    if (position.y < sizes.y) {
                        position.y++;
                    }
                    break;
                case 'SOUTH':
                    if (position.y > 0) {
                        position.y--;
                    }
                    break;
                case 'EAST':
                    if (position.x < sizes.x) {
                        position.x++;
                    }
                    break;
                case 'WEST':
                    if (position.x > 0) {
                        position.x--;
                    }
                    break;
            }
        },

        left: () => {
            let index = this.getCompassIndex(position.f) - 1;

            if (index < 0) {
                index = COMPASS.length - 1;
            }
            position.f = COMPASS[index];
        },

        right: () => {
            let index = this.getCompassIndex(position.f) + 1;

            if (index >= COMPASS.length) {
                index = 0;
            }
            position.f = COMPASS[index];
        },

        report: () => {
            let report;
            if (position === null) {
                report = ''
            }
            else {
                report = [
                    position.x.toString(),
                    position.y.toString(),
                    position.f
                ].join(',');
            }

            output.push(report);

            return report;
        },

        getPosition: () => {
            return position;
        },

        getCompassIndex: (f) => {
            let index,
                i = COMPASS.length;

            while (i--) {
                if (COMPASS[i] === f) {
                    index = i;
                }
            }
            return index;
        },

        getOutput: () => {
            return output.join('\n');
        }

    };
};

export default Simulation;
