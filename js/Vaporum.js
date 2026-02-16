
// vaporum Carousel
let vaporumCarousel_currentIndex = 0;
const vaporumCarousel_totalSlides = 4;
const vaporumCarousel = document.getElementById("vaporum-carousel");

const vaporumThumbnailsContainer = document.getElementById("vaporum-thumbnails");

// Generate Thumbnails
const vaporumSlideImages = [
    "../../img/Vaporum/Menu.png",
    "../../img/Vaporum/Vaporum_Debug.gif",
    "../../img/Vaporum/Vaporum_Attacks.gif",
    "../../img/Vaporum/Vaporum_Networked.gif",
];

vaporumSlideImages.forEach((src, index) => {
    const thumb = document.createElement("div");
    thumb.classList.add("thumbnail");
    if (index === 0) thumb.classList.add("active"); // First thumbnail is active

    const img = document.createElement("img");
    img.src = src;
    
    thumb.appendChild(img);
    thumb.onclick = () => goToVaporumSlide(index);

    vaporumThumbnailsContainer.appendChild(thumb);
});

function rotateVaporumCarousel(direction) {
    let newIndex = vaporumCarousel_currentIndex + direction;

    if (newIndex < 0 || newIndex >= vaporumCarousel_totalSlides) return;

    goToVaporumSlide(newIndex);
}

function goToVaporumSlide(index) {
    vaporumCarousel_currentIndex = index;
    vaporumCarousel.style.transform = `translateX(${-vaporumCarousel_currentIndex * 100}%)`;

    updateVaporumNavigationButtons();
    updateVaporumActiveThumbnail();
}

function updateVaporumNavigationButtons() {
    const prevButton = document.querySelector("#vaporum-carousel-container .prev");
    const nextButton = document.querySelector("#vaporum-carousel-container .next");

    prevButton.classList.toggle("disabled", vaporumCarousel_currentIndex === 0);
    nextButton.classList.toggle("disabled", vaporumCarousel_currentIndex === vaporumCarousel_totalSlides - 1);
}

function updateVaporumActiveThumbnail() {
    document.querySelectorAll("#vaporum-thumbnails .thumbnail").forEach((thumb, index) => {
        thumb.classList.toggle("active", index === vaporumCarousel_currentIndex);
    });
}


//-----------------------------------------------------------------------------------------------------------------------------------------
// Code Blocks
//-----------------------------------------------------------------------------------------------------------------------------------------

const hexGridCode = `
//---------------------------------------------------------------------------------------
// Creating a hex grid and determining world positions of tiles based on coordinates
//---------------------------------------------------------------------------------------
class Map
{
	static inline const Vec2 HEX_GRID_IBASIS = Vec2(0.866f, 0.5f);
	static inline const Vec2 HEX_GRID_JBASIS = Vec2(0.f, 1.f);
	static inline const Mat44 GRID_TO_WORLD_TRANSFORM = Mat44(HEX_GRID_IBASIS, HEX_GRID_JBASIS, Vec2::ZERO);

	Vec2 GetTileWorldPositionFromCoordinates(IntVec2 const& tileCoords) const
	{
		return GRID_TO_WORLD_TRANSFORM.TransformPosition2D(tileCoords.GetAsVec2());
	}
}
`

document.getElementById("hex-grid-codeblock").textContent = hexGridCode;

const unitMovementCode = `
//---------------------------------------------------------------------------------------
// Creating Catmull-Rom spline for movement animation
//---------------------------------------------------------------------------------------
void Unit::Move(IntVec2 const& newTileCoords)
{
	m_tileCoords = newTileCoords;

	std::vector<Vec2> path;
	m_map->GenerateHeatMapPath(path, m_tileCoords, m_previousTileCoords, m_heatMap);
	m_pathLength = (int)path.size();

	m_pathSpline = new CatmullRomSpline(path);
	m_movementTimer = new Stopwatch(&m_map->m_game->m_gameClock, 1.f);
	m_movementTimer->Start();
}

//---------------------------------------------------------------------------------------
// Movement along spline
//---------------------------------------------------------------------------------------
void Unit::Update()
{
	Vec3 newPosition =
		m_pathSpline->EvaluateAtParametric(m_movementTimer->GetElapsedTime() * m_pathLength).ToVec3();
	if (newPosition != m_position)
	{
		m_orientation.m_yawDegrees = (newPosition - m_position).GetAngleAboutZDegrees();
	}
	m_position = newPosition;
}
`

document.getElementById("unit-movement-codeblock").textContent = unitMovementCode;


const netSystemSendReceiveCode = `
//---------------------------------------------------------------------------------------
// Send Data
//---------------------------------------------------------------------------------------
for (int messageIndex = 0; messageIndex < (int)m_sendQueue.size(); messageIndex++)
{
	std::memcpy(m_sendBuffer, m_sendQueue[messageIndex].c_str(), m_sendQueue[messageIndex].length());
	if (strlen(m_sendBuffer) != 0)
	{
		int result = send(m_clientSocket, m_sendBuffer, (int)strlen(m_sendBuffer) + 1, 0);
		if (result <= 0)
		{
			int errCode = WSAGetLastError();
			if (errCode == 0 || errCode == WSAECONNABORTED || errCode == WSAECONNRESET)
			{
				m_connectionState = ConnectionState::NOT_CONNECTED;
			}
			else if (errCode != WSAEWOULDBLOCK)
			{
				ERROR_AND_DIE("Could not send over network!");
			}
		}

		if (result == strlen(m_sendBuffer) + 1)
		{
			memset(m_sendBuffer, 0, m_config.m_sendBufferSize);
		}
	}
}
m_sendQueue.clear();

//---------------------------------------------------------------------------------------
// Receive Data
//---------------------------------------------------------------------------------------
int result = recv(m_clientSocket, m_recvBuffer, sizeof(m_recvBuffer), 0);
if (result <= 0)
{
	int errCode = WSAGetLastError();
	if (errCode == 0 || errCode == WSAECONNABORTED || errCode == WSAECONNRESET)
	{
		m_connectionState = ConnectionState::NOT_CONNECTED;
	}
	else if (errCode != WSAEWOULDBLOCK)
	{
		ERROR_AND_DIE("Could not receive over the socket!");
	}
}

for (int recvCharIndex = 0; recvCharIndex < result; recvCharIndex++)
{
	if (m_recvBuffer[recvCharIndex] == '\0')
	{
		m_recvQueue.push_back(m_partialReceivedMessage);
		m_partialReceivedMessage = "";
		continue;
	}
	m_partialReceivedMessage += m_recvBuffer[recvCharIndex];
}

if (m_connectionState == ConnectionState::NOT_CONNECTED && mode == NetworkMode::CLIENT)
{
	FireEvent("NetworkDisconnected");
	g_console->AddLine(DevConsole::WARNING, "Connection lost. Attempting to reconnect...");
	closesocket(m_clientSocket);
	InitializeClientSocket();
}
`

document.getElementById("netsystem-codeblock").textContent = netSystemSendReceiveCode;


//-----------------------------------------------------------------------------------------------------------------------------------------
// Initialize EnlighterJS
//-----------------------------------------------------------------------------------------------------------------------------------------
EnlighterJS.init("pre", "code", {
    language : 'cpp',
    theme: 'dracula',
    indent: 4,
});
