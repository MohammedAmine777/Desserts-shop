import { desserts } from './data.js';
let cartitemvalue = 0;
let carttotal = 0;
let carttitle = document.querySelector(".cart-title");
let ordertotal = document.querySelector(".ordertotal");
let delivery = document.querySelector(".delivery");
let orderbtn = document.querySelector(".orderbtn");
let total = document.querySelector(".total");
let confirm = document.querySelector(".orderconfirm");
let totaldisplay = document.querySelector('.totaldisplay')
let startnew = document.querySelector('.startbtn')




document.querySelectorAll(".card").forEach(item => {
    const title = item.querySelector("h3");
    let addtocart = item.querySelector(".button");
    const counter = item.querySelector(".counter");
    const display = item.querySelector(".display");
    const minus = item.querySelector(".minus");
    const plus = item.querySelector(".plus");
    const topcart = item.querySelector(".topcard");
    const match = desserts.find(dessert => dessert.category === title.textContent.trim());
    document.querySelectorAll('.cart-items').forEach(cart => {
        const emptyimg = cart.querySelector(".emptyimg");
        const emptytitle = cart.querySelector(".emptytitle");
        function cartitem(title, quantity, unitPrice) {
            const totalPrice = (quantity * unitPrice).toFixed(2);
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            const main = document.createElement("div");
            main.classList.add("main");

            const newTitle = document.createElement("div");
            newTitle.classList.add("newtitle");
            const h2 = document.createElement("h2");
            h2.textContent = title;
            newTitle.appendChild(h2);

            const infos = document.createElement("div");
            infos.classList.add("infos");

            const h4_1 = document.createElement("h4");
            h4_1.textContent = `${quantity}x`;
            const h4_2 = document.createElement("h4");
            h4_2.textContent = `@$${unitPrice}`;
            const h4_3 = document.createElement("h4");
            h4_3.textContent = `$${totalPrice}`;

            function updateInfo(newquantity) {
                h4_1.textContent = `${newquantity}x`;
                h4_2.textContent = `@$${unitPrice}`;
                h4_3.textContent = `$${(newquantity * unitPrice).toFixed(2)}`;
            }

            infos.append(h4_1, h4_2, h4_3);

            main.append(newTitle, infos);

            const second = document.createElement("div");
            second.classList.add("second");

            const removeImg = document.createElement("img");
            removeImg.src = "./images/icon-remove-item.svg";
            removeImg.alt = "";
            removeImg.classList.add("remove");
            removeImg.addEventListener("click", function () {
                let value = parseInt(display.textContent);
                cartitemvalue -= value;
                carttotal -= match.price * value
                cartItem.remove();
                carttitle.textContent = 'Your Cart (' + cartitemvalue + ')';
                topcart.style.borderColor = 'transparent';
                addtocart.style.display = "flex";
                counter.style.display = "none";
                total.textContent = `$${(cartitemvalue * match.price).toFixed(2)}`;
                if (cartitemvalue < 1) {
                    emptyimg.style.display = "block";
                    emptytitle.style.display = "block";
                    cart.style.alignItems = 'center';
                    cart.style.padding = '10px 50px'
                    ordertotal.style.display = "none";
                    delivery.style.display = "none";    
                    orderbtn.style.display = "none";
                    counter.style.display = "none";
                    display.textContent = 0;
                    
                }
            });
            minus.addEventListener("click", function () {
                let value = parseInt(display.textContent);
                
                if (value < 1) {
                    cartItem.remove(); 
                    topcart.style.borderColor = 'transparent';
                   
                }
                if (cartitemvalue < 1) {
                    cart.style.alignItems = 'center';
                    ordertotal.style.display = "none";
                    delivery.style.display = "none";    
                    orderbtn.style.display = "none";
                    cart.style.padding = '10px 50px'

                }
            });
            second.appendChild(removeImg);
            cartItem.append(main, second);
            cart.appendChild(cartItem);
            updateInfo(quantity)
            return { updateInfo }
        }
        function createCartItem(titleText, quantity, unitPriceValue, totalPriceValue, imageUrl) {
            const container = document.querySelector('.items');
        
            const itemInfos = document.createElement('div');
            itemInfos.classList.add('iteminfos');
        
            const mainInfos = document.createElement('div');
            mainInfos.classList.add('main-infos');
        
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = '';
        
            const itemInfo = document.createElement('div');
            itemInfo.classList.add('iteminfo');
        
            const title = document.createElement('h2');
            title.textContent = titleText;
        
            const price = document.createElement('div');
            price.classList.add('price');
        
            const qty = document.createElement('h4');
            qty.textContent = `${quantity}x`;
        
            const unitPrice = document.createElement('h4');
            unitPrice.textContent = `@$${unitPriceValue}`;
        
            price.appendChild(qty);
            price.appendChild(unitPrice);
        
            itemInfo.appendChild(title);
            itemInfo.appendChild(price);
        
            mainInfos.appendChild(img);
            mainInfos.appendChild(itemInfo);
        
            const totalInfo = document.createElement('div');
            totalInfo.classList.add('totalinfo');
        
            const totalPrice = document.createElement('h4');
            totalPrice.textContent = `$${totalPriceValue}`;
        
            totalInfo.appendChild(totalPrice);
        
            itemInfos.appendChild(mainInfos);
            itemInfos.appendChild(totalInfo);
        
            container.appendChild(itemInfos);
            function update(newquantity) {
                qty.textContent = `${newquantity}x`
                totalPrice.textContent = `$${(newquantity * unitPriceValue).toFixed(2)}`;
            }
            minus.addEventListener("click", function () {
                let value = parseInt(display.textContent);
                if (value < 1) {
                    itemInfos.remove(); 
                }
            })
            
           
            
            update(quantity)
            return {update}
        }
        
        
        let currentCartItem = null;
        let orderitem = null;
        addtocart.addEventListener("click", function () {
            let value = 1
            addtocart.style.display = "none";
            counter.style.display = "flex";
            display.textContent = 1;
            cartitemvalue++;
            carttitle.textContent = 'Your Cart (' + cartitemvalue + ')';
            topcart.style.borderColor = 'hsl(14, 77%, 52%)';
            if (match) {
                emptyimg.style.display = "none";
                emptytitle.style.display = "none";
                ordertotal.style.display = "flex";
                cart.style.padding = '0'
                delivery.style.display = "flex";
                orderbtn.style.display = "flex";
                cart.style.alignItems = 'stretch';
                carttotal += value * match.price
                total.textContent = `$${carttotal.toFixed(2)}`;
                currentCartItem = cartitem(match.name, value, match.price);
                orderitem = createCartItem(match.name, display.textContent, match.price, (cartitemvalue * match.price).toFixed(2), match.image.thumbnail);

                
            }
        });
        minus.addEventListener("click", function () {
            let value = parseInt(display.textContent);
            carttotal -=  match.price

            if (value > 1) {
                value--;
                currentCartItem.updateInfo(value);
                orderitem.update(value)
                display.textContent = value;
                cartitemvalue--;
                total.textContent = `$${carttotal.toFixed(2)}`;
            }
            else {
                addtocart.style.display = "flex";
                counter.style.display = "none";
                display.textContent = 0;
                cartitemvalue--;
                total.textContent = `$${carttotal.toFixed(2)}`;
                topcart.style.borderColor = 'transparent';
            
            }

            if (cartitemvalue < 1) {
                emptyimg.style.display = "block";
                emptytitle.style.display = "block";
                carttotal = 0
            } else {
                emptyimg.style.display = "none";
                emptytitle.style.display = "none";
            }
            carttitle.textContent = 'Your Cart (' + cartitemvalue + ')';
        });
        plus.addEventListener("click", function () {
            let value = parseInt(display.textContent);
            value++;
            display.textContent = value;
            cartitemvalue++;
            carttitle.textContent = 'Your Cart (' + cartitemvalue + ')';
            if (currentCartItem) currentCartItem.updateInfo(value);
            carttotal += match.price
            total.textContent = `$${carttotal.toFixed(2)}`;
            orderitem.update(value)

        });
        orderbtn.addEventListener("click", function () { 
            confirm.style.display = "flex";
            totaldisplay.textContent = `$${carttotal.toFixed(2)}`
        })
        startnew.addEventListener('click', function(){
            confirm.style.display = 'none'
            location.reload()
        })


    })







});
document.querySelectorAll(".topcard").forEach(image => {
    function updateImageSrc() {
        const img = image.querySelector("#img");
        if (!img) return;
        let src = img.getAttribute("src");
        if (window.matchMedia("(max-width: 375px)").matches) {
            img.setAttribute("src", src.replace("-desktop", "-mobile"));
        } else {
            img.setAttribute("src", src.replace("-mobile", "-desktop"));
        }
    }
    updateImageSrc();
    window.addEventListener("resize", updateImageSrc);
});
