const task = document.querySelector('.task');
const btn_add = document.querySelector('.btn_add');
const list = document.querySelector('.list');
const all = document.querySelector('.all');
const pending = document.querySelector('.pending');
const completed = document.querySelector('.completed');
const clear = document.querySelector('.clear');

// Data Initialization
let data = [
    // {
    //     "task": "Do homework",
    //     "completed": false,
    //     "uuid": generateShortUUID()
    // },
    // {
    //     "task": "Do laundry",
    //     "completed": "checked",
    //     "uuid": generateShortUUID()
    // },
];
let newData = [];

// Generate UUID
function generateShortUUID() {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uuid = '';
    for (let i = 0; i < 10; i++) {
        uuid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uuid;
}

// Data Initialization
function renderData(dataToRender) {
    let str = '';
    dataToRender.forEach(function(item, index) {
        str += `
            <li>
                <label class="checkbox" for="">
                    <input type="checkbox" class="checkbox" data-uuid=${item.uuid} ${item.completed} />
                    <span>${item.task}</span>
                </label>
                <a href="#" class="btn_delete" data-uuid=${item.uuid}>✕</a>
            </li>
        `;
    });

    list.innerHTML = str;
    const itemRemaining = document.querySelector('.list_footer>p');
    itemRemaining.innerHTML = `<p>${dataToRender.length} Items Remaining</p>`; //update number of item remaining
}

renderData(data);

// add to do item
btn_add.addEventListener('click', function(e) {
    if (task.value === "") {
        alert('Please write down your to do list');
        return;
    }
    let toDoItem = {
        task: task.value,
        completed: false,
        uuid: generateShortUUID()
    };
    data.push(toDoItem);
    task.value = ""; //clear text box

    // If in pending or completed page add to do list,re-render
    if (all.classList.contains('active')) {
        renderData(data);
    } else if (pending.classList.contains('active')) {
        newData = data.filter(function(item) {
            return item.completed === false;
        });
        renderData(newData);
    } else if (completed.classList.contains('active')) {
        newData = data.filter(function(item) {
            return item.completed === "checked";
        });
        renderData(newData);
    }
});

// delete to do item
list.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn_delete')) {
        let deleteUuid = e.target.getAttribute('data-uuid');

        data = data.filter(function(item) {
            return item.uuid !== deleteUuid;
        });

        if (all.classList.contains('active')) {
            renderData(data);
        } else {
            newData = newData.filter(function(item) {
                return item.uuid !== deleteUuid;
            });
            renderData(newData);
        }
    }
});

// check items completed or not
list.addEventListener('click', function(e) {
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
        let checkboxUuid = e.target.getAttribute("data-uuid");
        let completedTask;
        
        // If checked, the data will be moved to the end
        data.forEach(function(item, index) {
            if (item.uuid === checkboxUuid) {
                item.completed = e.target.checked ? "checked" : false;
                if (item.completed) {
                    completedTask = data.splice(index, 1)[0];
                }
            }
        });

        if (completedTask) {
            data.push(completedTask);
        }

        // If checked or unchecked again, re-render
        if (pending.classList.contains('active')) {
            newData = data.filter(function(item) {
                return item.completed === false;
            });
        } else if (completed.classList.contains('active')) {
            newData = data.filter(function(item) {
                return item.completed === "checked";
            });
        } else {
            newData = data;
        }

        renderData(newData);
    }
});


// tab status
const tab = document.querySelector('.tab');
const listStatus = document.querySelectorAll('.tab>li');
tab.addEventListener("click", function(e) {
    listStatus.forEach(function(item) {
        item.classList.remove("active");
    });
    e.target.classList.add("active");
    // if click All/Pending/Completed
    if (e.target.textContent === "All") {
        newData = data;
        renderData(newData);
    } else if (e.target.textContent === "Pending") {
        newData = data.filter(function(item) {
            return item.completed === false;
        });
        renderData(newData);
    } else if (e.target.textContent === "Completed") {
        newData = data.filter(function(item) {
            return item.completed === "checked";
        });
        renderData(newData);
    }
});

// clear completed items
clear.addEventListener("click", function(e) {
    if (all.classList.contains('active') || pending.classList.contains('active')) {
        data = data.filter(function(item) {
            return item.completed === false;
        });
        renderData(data);
    } else if (completed.classList.contains('active')) {
        data = data.filter(function(item) {
            return item.completed !== "checked";
        });
        newData = [];
        renderData(newData);
    }
});