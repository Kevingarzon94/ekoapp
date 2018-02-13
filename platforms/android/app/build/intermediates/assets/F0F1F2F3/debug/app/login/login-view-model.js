const Observable = require("data/observable").Observable;
const observableModule = require("data/observable");


function HomeViewModel() {
    const viewModel = observableModule.fromObject({
        email: "",
        password: "",

    });
    return viewModel;
}

module.exports = HomeViewModel;
