
// Doomenstein Carousel
let doomensteinCarousel_currentIndex = 0;
const doomensteinCarousel_totalSlides = 2;
const doomensteinCarousel = document.getElementById("doomenstein-carousel");

const doomensteinThumbnailsContainer = document.getElementById("doomenstein-thumbnails");

// Generate Thumbnails
const doomensteinSlideImages = [
    "../../img/Doomenstein/DoomensteinVR.gif",
    "../../img/Doomenstein/Doomenstein_Gold.png",
];

doomensteinSlideImages.forEach((src, index) => {
    const thumb = document.createElement("div");
    thumb.classList.add("thumbnail");
    if (index === 0) thumb.classList.add("active"); // First thumbnail is active

    const img = document.createElement("img");
    img.src = src;
    
    thumb.appendChild(img);
    thumb.onclick = () => goToDoomensteinSlide(index);

    doomensteinThumbnailsContainer.appendChild(thumb);
});

function rotateDoomensteinCarousel(direction) {
    let newIndex = doomensteinCarousel_currentIndex + direction;

    if (newIndex < 0 || newIndex >= doomensteinCarousel_totalSlides) return;

    goToDoomensteinSlide(newIndex);
}

function goToDoomensteinSlide(index) {
    doomensteinCarousel_currentIndex = index;
    doomensteinCarousel.style.transform = `translateX(${-doomensteinCarousel_currentIndex * 100}%)`;

    updateDoomensteinNavigationButtons();
    updateDoomensteinActiveThumbnail();
}

function updateDoomensteinNavigationButtons() {
    const prevButton = document.querySelector("#doomenstein-carousel-container .prev");
    const nextButton = document.querySelector("#doomenstein-carousel-container .next");

    prevButton.classList.toggle("disabled", doomensteinCarousel_currentIndex === 0);
    nextButton.classList.toggle("disabled", doomensteinCarousel_currentIndex === doomensteinCarousel_totalSlides - 1);
}

function updateDoomensteinActiveThumbnail() {
    document.querySelectorAll("#doomenstein-thumbnails .thumbnail").forEach((thumb, index) => {
        thumb.classList.toggle("active", index === doomensteinCarousel_currentIndex);
    });
}

//-----------------------------------------------------------------------------------------------------------------------------------------
// Code Blocks
//-----------------------------------------------------------------------------------------------------------------------------------------

const shadowShaderCode = `
//--------------------------------------------------------------------------------------
// Shadow shader for shadow pass with shadow map DSV
//--------------------------------------------------------------------------------------
v2p_t VertexMain(vs_input_t input)
{
	float4 localPosition = float4(input.localPosition, 1);
	float4 worldPosition = mul(ModelMatrix, localPosition);
	float4 lightViewPosition = mul(LightViewMatrix, worldPosition);
	float4 lightSpacePosition = mul(LightProjectionMatrix, lightViewPosition);

	v2p_t v2p;
	v2p.position = lightSpacePosition;
	v2p.color = input.color;
	v2p.uv = input.uv;
	v2p.tangent = float4(0, 0, 0, 0);
	v2p.bitangent = float4(0, 0, 0, 0);
	v2p.normal = float4(0, 0, 0, 0);
	return v2p;
}

//--------------------------------------------------------------------------------------
// Diffuse shader using shadow map DSV
//--------------------------------------------------------------------------------------
float4 PixelMain(v2p_t input) : SV_Target0
{
	float directional = 0.0;
		float2 shadowTexCoords;
		shadowTexCoords.x = 0.5f + (input.lightSpacePos.x / input.lightSpacePos.w * 0.5f);
		shadowTexCoords.y = 0.5f - (input.lightSpacePos.y / input.lightSpacePos.w * 0.5f);
		float pixelDepth = input.lightSpacePos.z / input.lightSpacePos.w;
		
	if ((saturate(shadowTexCoords.x) == shadowTexCoords.x) &&
		(saturate(shadowTexCoords.y) == shadowTexCoords.y) &&
		(pixelDepth > 0))
	{
		float lighting = shadowMap.SampleCmpLevelZero(ShadowSampler, shadowTexCoords, pixelDepth);
		
		if (lighting > 0)
		{
			directional = SunIntensity * saturate(dot(normalize(input.normal.xyz), -SunDirection));
		}
	}
	
	float ambient = AmbientIntensity;
	float4 lightColor = float4((ambient + directional).xxx, 1);
	float4 textureColor = diffuseTexture.Sample(diffuseSampler, input.uv);
	float4 vertexColor = input.color;
	float4 modelColor = ModelColor;
	float4 color = lightColor * textureColor * vertexColor * modelColor;
	clip(color.a - 0.01f);
	return color;
}
`

document.getElementById("shadow-shader-codeblock").textContent = shadowShaderCode;


const eightFacingSpriteRenderCode = `
//--------------------------------------------------------------------------------------
// Get SpriteAnimDefinition with largest dot product with given direction for 8-facing sprites
//--------------------------------------------------------------------------------------
SpriteAnimDefinition AnimationGroupDefinition::GetAnimationForDirection(Vec3 const& direction) const
{
	float largestDotProduct = FLT_MIN;
	int resultAnimationIndex = 0;

	for (int animationIndex = 0; animationIndex < (int)m_animations.size(); animationIndex++)
	{
		float dotProduct = DotProduct3D(direction, m_directions[animationIndex]);
		if (dotProduct > largestDotProduct)
		{
			resultAnimationIndex = animationIndex;
			largestDotProduct = dotProduct;
		}
	}

	return m_animations[resultAnimationIndex];
}
`
document.getElementById("eight-facing-sprite-codeblock").textContent = eightFacingSpriteRenderCode;

//-----------------------------------------------------------------------------------------------------------------------------------------
// Initialize EnlighterJS
//-----------------------------------------------------------------------------------------------------------------------------------------
EnlighterJS.init("pre", "code", {
    language : 'cpp',
    theme: 'dracula',
    indent: 4,
});

