/**
 * push data to server
 * @param {Element} parent
 * @param {Element} node
 * @return {Boolean} true/false
 * @author fengxinglong
 */
(function() {
	!window.STK && (window.STK={});
	!window.STK.trans &&(window.STK.trans={});
    window.STK.trans.shopAndItem={
    	"saveItem":"http://editor.dev.com/ajax-saveiteminfo", //保存单品
    	"saveShop":"http://editor.dev.com/ajax-saveshopinfo", //保存店铺
    }
})();
