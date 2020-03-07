module.exports = {
	formats: 'local woff woff2',
	display: "swap",
	custom: {
		"Formular": {
			variants: {
				normal: {
					300: {
						url: {
							woff: "../fonts/Formular/formular-light-webfont.woff",
							woff2: "../fonts/Formular/formular-light-webfont.woff2",
						}
					},
					400: {
						url: {
							woff: "../fonts/Formular/formular-webfont.woff",
							woff2: "../fonts/Formular/formular-webfont.woff2",
						}
					},
					700: {
						url: {
							woff: "../fonts/Formular/formular-bold-webfont.woff",
							woff2: "../fonts/Formular/formular-bold-webfont.woff2",
						}
					}
				}
			}
		},
		"Proxima Nova": {
			variants: {
				normal: {
					300: {
						url: {
							woff: "../fonts/Proxima-nova/light/proxima_nova_light.woff",
							woff2: "../fonts/Proxima-nova/light/proxima_nova_light.woff2",
						}
					},
					400: {
						url: {
							woff: "../fonts/Proxima-nova/regular/proxima_nova_regular.woff",
							woff2: "../fonts/Proxima-nova/regular/proxima_nova_regular.woff2",
						}
					},
					// 700: {
					// 	url: {
					// 		woff: "../fonts/Formular/formular-bold-webfont.woff",
					// 		woff2: "../fonts/Formular/formular-bold-webfont.woff2",
					// 	}
					// }
				}
			}
		}
	}
}