const COMMAND_FORMATS = {
    REGULAR: /^(MOVE|LEFT|RIGHT|REPORT)$/,
    PLACE:   /^(?:PLACE)\s(\d+),(\d+),(NORTH|SOUTH|EAST|WEST)+$/
};

module.exports = {

    getCommands: (input, tableSize) => {
        console.log('input value', this);
        var _this = this;
        const commands      = inputToArray(input);
        const startIndex    = this.getFirstPlaceIndex(commands, tableSize);
        const validCommands = [];
        

        _includeInValidCommands = (command) => {
            return (
                _this.isValidCommand(commands[i]) ||
                _this.isValidPlaceCommand(commands[i], tableSize)
            );
        };

        // return empty array if there are no commands to process
        if (startIndex < 0) {
            return [];
        }

        // take copy of array starting at first valid PLACE command
        commands = commands.slice(startIndex);

        // compose valid commands to return
        for (var i = 0; i < commands.length; i++) {
            if ( _includeInValidCommands(commands[i]) ) {
                validCommands.push(commands[i]);
            }
        };

        return validCommands;
    },

    inputToArray: (input) => {
        return input === '' ? [] : input.split(/\n/);
    },

    getFirstPlaceIndex: (commands, tableSize) => {
        var index = -1;
        for (var i = 0; i < commands.length; i++) {
            if ( this.isValidPlaceCommand( commands[i], tableSize ) ) {
                index = i;
                break;
            }
        };
        return index;
    },

    isValidCommand: (command) => {
        return COMMAND_FORMATS.REGULAR.exec(command) !== null;
    },

    isValidPlaceCommand: (command, tableSize) => {
        var isPlaceFormat = COMMAND_FORMATS.PLACE.exec(command) !== null,
            isInRange     = this.isInRange(command, tableSize);

        return isPlaceFormat && isInRange;
    },

    getPlaceData: (placeCommand) => {
        var matches = COMMAND_FORMATS.PLACE.exec(placeCommand);

        return matches === null ? null : {
            x: parseInt( matches[1], 10 ),
            y: parseInt( matches[2], 10 ),
            f: matches[3]
        };
    },

    isInRange: (placeCommand, tableSize) => {
        var data = this.getPlaceData(placeCommand);

        if (data === null) {
            return false;
        }

        return (data.x <= tableSize.x) && (data.y <= tableSize.y);
    }

};