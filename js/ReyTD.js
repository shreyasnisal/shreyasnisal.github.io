
// menus Carousel
let menusCarousel_currentIndex = 0;
const menusCarousel_totalSlides = 4;
const menusCarousel = document.getElementById("menus-carousel");

const menusThumbnailsContainer = document.getElementById("menus-thumbnails");

// Generate Thumbnails
const menusSlideImages = [
    "../../img/ReyTD/Menu.png",
    "../../img/ReyTD/Controls.png",
    "../../img/ReyTD/LevelSelect.png",
    "../../img/ReyTD/Paused.png",
];

menusSlideImages.forEach((src, index) => {
    const thumb = document.createElement("div");
    thumb.classList.add("thumbnail");
    if (index === 0) thumb.classList.add("active"); // First thumbnail is active

    const img = document.createElement("img");
    img.src = src;
    
    thumb.appendChild(img);
    thumb.onclick = () => goToMenusSlide(index);

    menusThumbnailsContainer.appendChild(thumb);
});

function rotateMenusCarousel(direction) {
    let newIndex = menusCarousel_currentIndex + direction;

    if (newIndex < 0 || newIndex >= menusCarousel_totalSlides) return;

    goToMenusSlide(newIndex);
}

function goToMenusSlide(index) {
    menusCarousel_currentIndex = index;
    menusCarousel.style.transform = `translateX(${-menusCarousel_currentIndex * 100}%)`;

    updateMenusNavigationButtons();
    updateMenusActiveThumbnail();
}

function updateMenusNavigationButtons() {
    const prevButton = document.querySelector("#menus-carousel-container .prev");
    const nextButton = document.querySelector("#menus-carousel-container .next");

    prevButton.classList.toggle("disabled", menusCarousel_currentIndex === 0);
    nextButton.classList.toggle("disabled", menusCarousel_currentIndex === menusCarousel_totalSlides - 1);
}

function updateMenusActiveThumbnail() {
    document.querySelectorAll("#menus-thumbnails .thumbnail").forEach((thumb, index) => {
        thumb.classList.toggle("active", index === menusCarousel_currentIndex);
    });
}


//-----------------------------------------------------------------------------------------------------------------------------------------
// Code Blocks
//-----------------------------------------------------------------------------------------------------------------------------------------

definitionsXmlCode = `
<!-- Tower Definitions -->
<TowerDefinition
	name="Burn" turnSpeed="360.0" refireTime="0.02" range="3.0" damage="0.2~0.4"
	burnDamagePerSecond="20.0~40.0" burnDuration="5.0"
	fireParticleColor="255,165,0,255" numParticlesFired="2" firedParticleSize="0.3~0.4" firedParticleLifetime="0.5"
	firedParticlePosition="0.0,0.0,0.65" firedParticleVelocity="3.0,0.0,0.0" firedParticleColor="255,165,0"
	firedParticleRotationSpeed="30.0~60.0" firedParticle="BurnFire" firedParticleBlendMode="Additive"
	model="Data/Models/Towers/Burn" turretModel="Data/Models/Towers/Burn_Turret"
	cost="350" fireSFX="Data/Audio/Burn_Fire.ogg">
		<Transform x="0.0,-1.0,0.0" y="0.0,0.0,1.0" z="1.0,0.0,0.0" scale="0.5" />
		<TurretTransform x="0.0,-1.0,0.0" y="0.0,0.0,1.0" z="1.0,0.0,0.0" scale="0.5" T="0.0,0.0,0.5" />
</TowerDefinition>

<!-- Enemy Definitions -->
<!-- Dragon Evolved -->
<EnemyDefinition
	name="Dragon_Evolved" health="500.0" speed="2.5" turnSpeed="180.0"
	model="Data/Models/Enemies/Dragon_Evolved" texture="Data/Models/Enemies/EnemyTexture.png"
	moneyMultiplier="80" immuneToBurn="true" slowMultiplier="0.5">
		<Transform x="0.0,-1.0,0.0" y="0.0,0.0,1.0" z="1.0,0.0,0.0" scale="0.2" />
</EnemyDefinition>
`

document.getElementById("definitions-codeblock").textContent = definitionsXmlCode;


const statusEffectsCode = `
struct StatusEffect
{
public:
	StatusEffectType m_type = StatusEffectType::INVALID;
	Enemy* m_enemy = nullptr;
	Stopwatch* m_durationTimer;
	bool m_isActive = true;

public:
	virtual ~StatusEffect();
	StatusEffect(Enemy* enemy, float duration, StatusEffectType type = StatusEffectType::INVALID);
	virtual void Update(float deltaSeconds) = 0;
};

//---------------------------------------------------------------------------------------------------
struct EnemyPoisonDebuff : public StatusEffect
{
public:
	float m_damagePerSecond = 0.f;

public:
	~EnemyPoisonDebuff();
	EnemyPoisonDebuff(Enemy* enemy, float duration, float damagePerSecond);
	virtual void Update(float deltaSeconds) override;
};

//----------------------------------------------------------------------------------------------------
void Enemy::AddStatusEffect(StatusEffect* statusEffect)
{
	StatusEffect* maxStatusEffect = GetMaxActiveStatusEffectOfType(statusEffect->m_type);
	if (!maxStatusEffect)
	{
		m_statusEffects.push_back(statusEffect);
		return;
	}

	if (DoesStatusEffectAExceedB(statusEffect, maxStatusEffect))
	{
		maxStatusEffect->m_isActive = false;
		m_statusEffects.push_back(statusEffect);
	}

	if (m_statusEffectParticleTimer.IsStopped())
	{
		m_statusEffectParticleTimer.Start();
	}
}
`

document.getElementById("status-effects-codeblock").textContent = statusEffectsCode;

const particlesCode = `
class Particle
{
public:
	~Particle();
	Particle(
		Vec3 const& startPos,
		Vec3 const& velocity,
		float size,
		Clock* parentClock,
		float lifetime,
		std::string const& textureName,
		Rgba8 const& color,
		BlendMode blendMode = BlendMode::ALPHA,
		bool fadeOverLifetime = true);

	Particle(
		Vec3 const& startPos,
		Vec3 const& velocity,
		float rotation,
		float rotationSpeed,
		float size,
		Clock* parentClock,
		float lifetime,
		std::string const& textureName,
		Rgba8 const& color,
		BlendMode blendMode = BlendMode::ALPHA,
		bool fadeOverLifetime = true);

	void Update(float deltaSeconds);
	void Render(Camera const& camera) const;

	static void InitializeParticleTextures();

public:
	Vec3 m_position;
	Vec3 m_velocity;
	float m_size;
	Rgba8 m_color;
	unsigned char m_opacity = 255;
	bool m_fadeOverLifetime = true;
	Texture* m_texture = nullptr;
	Stopwatch m_lifetimeTimer;
	BlendMode m_blendMode;
	VertexBuffer* m_vbo;
	bool m_isDestroyed = false;
	float m_rotation = 0.f;
	float m_rotationSpeed = 0.f;

	static std::map<std::string, Texture*> s_particleTextures;
};
`

document.getElementById("particles-codeblock").textContent = particlesCode;

EnlighterJS.init("pre", "code", {
    language : 'cpp',
    theme: 'dracula',
    indent: 4,
});
