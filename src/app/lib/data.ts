const mockUrls = [
	"https://dtc2hyxvy7.ufs.sh/f/dv6zpetQU1YKXSxUQzmvwYhr8miBR1Z4kNdtcgC7QU3KpPjv",
	"https://dtc2hyxvy7.ufs.sh/f/dv6zpetQU1YKP9fsSScomEFJXvhVSG7l8NCnxcPDZkUQzO3L",
	"https://dtc2hyxvy7.ufs.sh/f/dv6zpetQU1YK0hzKv4GQZpTVyqdiLaSAemIrzthJOvx2w6XM",
];

export const mockImages = mockUrls.map((url, index) => ({
	id: index + 1,
	url,
}));
