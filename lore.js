var Lore = module.exports = {
    msg: {
        duration = 1000,
        text: "What?"
    }
};

Lore.prototype.pickupMsg = function (item) {
	return randomDrops(item) + "You take the"
}