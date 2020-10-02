

export function mongoObjectId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

/*
 *    
 *    Generate a Random color with opacity of 8C
 *    
 *    
 */
export function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	color = ColorLuminance(color, -0.2);
	return color //+ "8C";
}


export function checkRouteName(name, index) {
	return name && name === "" ? "Rota " + index : name;
}

export function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#",
		c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i * 2, 2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00" + c).substr(c.length);
	}

	return rgb;
}


export async  function sleep(ms) {
	return await new Promise(resolve => setTimeout(resolve, ms));
}

export function getMapsPlacesComponents(address_components){
	var addressComponents = {}
	
	for (let i = 0; i < address_components.length; i++) {
		for (let j = 0; j < address_components[i].types.length; j++) {
			switch (address_components[i].types[j]) {
				case "postal_code":
					addressComponents.cep = address_components[i].long_name
					break;
				case "administrative_area_level_2":
					addressComponents.city = address_components[i].long_name
					break;
				case "sublocality":
					addressComponents.neighborhood = address_components[i].long_name
					break;
				case "route":
					addressComponents.street = address_components[i].long_name
					break;
				default:
					break;
			}
		}
	}
	return addressComponents
}
