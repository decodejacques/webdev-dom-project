// Generates a new random id
// Used when creating a new item
let genId = () => {
    return "" + Math.floor(Math.random() * 1000000000)
}

// The current screen viewed by the user
// Certain button presses changes this variable
// It is used in the render function to determine what to display to the user
let currentView = "items-for-sale"

// Corresponds to the id of the item in the item details view
let detailItemId = undefined

// Stores all the items that all for sale. 
// The key of the map is the item id
let itemsForSale = new Map()

// Some hard coded data
itemsForSale.set("xyz", {
    itemId: "xyz",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Panton_Stuhl.jpg/255px-Panton_Stuhl.jpg"
})


// Returns a DOM node for displaying an item
let itemForSaleToElem = item => {
    // For debugging purposes
    console.log("creating DOM node for", item)

    // This DOM node will contain the image of the item
    let imageElem = document.createElement("img")
    imageElem.setAttribute("src", item.imageURL)
    imageElem.setAttribute("class", "short-image")

    // Clicking this button will show the details page for the item
    let detailsButton = document.createElement("button")
    detailsButton.innerText = "Get item details"
    detailsButton.addEventListener("click", () => {
        currentView = "item-detail"
        detailItemId = item.itemId
        render()
    })

    let container = document.createElement("div")
    container.appendChild(imageElem)
    container.appendChild(detailsButton)
    container.setAttribute("class", "item-for-sale")

    return container
}

// Returns a DOM node for displaying all items
let allItemsView = () => {
    console.log("all items view")
    // itemIds will contain an array that contains all the item ids
    let itemIds = Array.from(itemsForSale.keys())
    let container = document.createElement("div")
    // Iterate through all the item ids one by one
    for (let i = 0; i < itemIds.length; i++) {
        let id = itemIds[i]
        let item = itemsForSale.get(id)
        console.log("item", item)
        // itemForSaleToElem returns a DOM node representing the element
        let itemElem = itemForSaleToElem(item)
        container.appendChild(itemElem)
    }
    return container
}

// When the user clicks the "add item" button
let addItemView = () => {
    // For debugging purposes
    console.log("add item view")
    let imageLabel = document.createElement("p")
    imageLabel.innerText = "Image url:"

    // Image URL input box
    let imageBox = document.createElement("input")
    imageBox.setAttribute("type", "text")

    // Submit button. It adds an item to the itemsForSale map
    let submitButton = document.createElement("button")
    submitButton.innerText = "Add item"
    submitButton.addEventListener("click", () => {
        let newItemId = genId()
        let newItem = {
            itemId: newItemId,
            imageURL: imageBox.value
        }
        itemsForSale.set(newItemId, newItem)
        currentView = "items-for-sale"
        render()
    })

    let container = document.createElement("div")
    container.appendChild(imageLabel)
    container.appendChild(imageBox)
    container.appendChild(submitButton)

    return container
}

// When you ask for the details for an item, this is what gets displayed
let itemDetailView = () => {
    console.log("item detail view")
    let contents = document.createElement("p")
    contents.innerText = "not implemented yet"
    return contents
}

// The navigation buttons on top
let navigationButtons = () => {
    let homeButton = document.createElement("button")
    homeButton.innerText = "home"
    homeButton.addEventListener("click", () => {
        currentView = "items-for-sale"
        console.log("new view", currentView)
        render()
    })

    let addItemButton = document.createElement("button")
    addItemButton.innerText = "add item"
    addItemButton.addEventListener("click", () => {
        currentView = "add-item"
        console.log("new view", currentView)
        render()

    })

    let container = document.createElement("div")
    container.appendChild(homeButton)
    container.appendChild(addItemButton)
    return container
}

// Rerenders the page
let render = () => {
    // Will contain a reference 
    let toRender = undefined
    // For debugging purposes
    console.log("rendering view", currentView)
    if (currentView === "items-for-sale") {
        toRender = allItemsView()
    } else if (currentView === "item-detail") {
        toRender = itemDetailView()
    } else if (currentView === "add-item") {
        toRender = addItemView()
    } else {
        // woops
        alert("unhandled currentView " + currentView)
    }
    let nav = navigationButtons()
    // Removes all children from the body
    document.body.innerHTML = ""
    document.body.appendChild(nav)
    document.body.appendChild(toRender)
}

// Initial render
render()