
const asyncTextureLoadingCode = `
//---------------------------------------------------------------------------------------------------
// Renderer::CreateTextureFromFile
// Returns promise since the image file will be loaded asynchronously by JS
//---------------------------------------------------------------------------------------------------
CreateTextureFromFile(filename)
{
	return new Promise(resolve => {
		const imageDomElem = new Image();
		imageDomElem.addEventListener("load", () =>
		{
			this.m_context.pixelStorei(this.m_context.UNPACK_FLIP_Y_WEBGL, true);
			resolve(this.CreateTextureFromData(
							filename,
							imageDomElem.width,
							imageDomElem.height,
							imageDomElem));
		});
		imageDomElem.src = filename;
	});
}

//---------------------------------------------------------------------------------------------------
// Game code using asynchronous texture loading
//---------------------------------------------------------------------------------------------------
g_renderer.CreateOrGetTextureFromFile("/Sandbox/Data/Images/TestUV.png").then(loadedTexture =>
{
	this.m_testTexture = loadedTexture;
})
`

document.getElementById("async-texture-loading-codeblock").textContent = asyncTextureLoadingCode;


const overloadingCode = `
//---------------------------------------------------------------------------------------------------
// Vec3 class without operator overloading
//---------------------------------------------------------------------------------------------------
export default class Vec3
{
	constructor(x = 0.0, y = 0.0);

	Add(vec3ToAdd); // operator +=
	Subtract(vec3ToSubtract); // operator -=
	GetSum(vec3ToAdd); // operator +
	GetDifference(vec3ToSubtract); // operator -
	Scale(uniformScale); // operator *= with float argument
	GetScaled(uniformScale); // operator * with float argument
}

//---------------------------------------------------------------------------------------------------
// Game code using Vec3 objects
//---------------------------------------------------------------------------------------------------
Entity::Update()
{
	this.m_position.Add(this.m_velocity.GetScaled(deltaSeconds));
}
`

document.getElementById("overloading-codeblock").textContent = overloadingCode;


//---------------------------------------------------------------------------------------------------
// Initialize EnlighterJS
//---------------------------------------------------------------------------------------------------
EnlighterJS.init("pre", "code", {
    language : 'js',
    theme: 'dracula',
    indent: 4,
});
