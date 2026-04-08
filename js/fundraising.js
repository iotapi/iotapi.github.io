// Stripe Publishable Key found in dashboard
const stripe_publishable_key = "pk_live_51T47o7GxEcS9BmG1olDbvhq7UC5hocFgZ7Va8iEQ3kXmvCva6Ub6Yrvv669Xg31rc8PAZpqrqVTu1xpvRBnIm8sE00yBnid0lt"

// Ids for links found by clicking the "make buy button" and copying and pasting the buy-button-id from the code
const link_ids = [
    // Meal
    "buy_btn_1TJNlgGxEcS9BmG1CJZd1rcE",
    // Tank of Gas
    "buy_btn_1TJNWsGxEcS9BmG1LcnnJK3T",
    // Registration
    "buy_btn_1TJNmLGxEcS9BmG1o72x8t3k",
    // Hotel Room
    "buy_btn_1TJfG4GxEcS9BmG1fCmcA8Um",
    // Miscellaneous
    "buy_btn_1TJNcIGxEcS9BmG1LYinlLiX",
]

// Grab the fundraising container
const donation_container = document.getElementById("support-items")

for (let i in link_ids)
{
    const link_container = document.createElement("div")
    link_container.className = "support-item"
    
    const buy_button = document.createElement("stripe-buy-button")
    buy_button.setAttribute("buy-button-id", link_ids[i])
    buy_button.setAttribute("publishable-key", stripe_publishable_key)
    link_container.appendChild(buy_button)

    donation_container.appendChild(link_container)
}