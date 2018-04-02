const Observable = require("data/observable").Observable;
const observableModule = require("data/observable");


function HomeViewModel() {
    const viewModel = observableModule.fromObject({
        selectedListPickerIndex: 0,
        
    });
    return viewModel;
}

module.exports = HomeViewModel;
