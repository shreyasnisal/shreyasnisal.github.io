
// SimpleMiner Carousel
let simpleMinerCarousel_currentIndex = 0;
const simpleMinerCarousel_totalSlides = 3;
const simpleMinerCarousel = document.getElementById("simpleminer-carousel");

const simpleMinerThumbnailsContainer = document.getElementById("simpleminer-thumbnails");

// Generate Thumbnails
const simpleMinerSlideImages = [
    "../../img/SimpleMinerVR/Animated_Water.gif",
    "../../img/SimpleMinerVR/Glowstone.png",
    "../../img/SimpleMinerVR/SimpleMiner.png",
];

simpleMinerSlideImages.forEach((src, index) => {
    const thumb = document.createElement("div");
    thumb.classList.add("thumbnail");
    if (index === 0) thumb.classList.add("active"); // First thumbnail is active

    const img = document.createElement("img");
    img.src = src;
    
    thumb.appendChild(img);
    thumb.onclick = () => goToSimpleminerSlide(index);

    simpleMinerThumbnailsContainer.appendChild(thumb);
});

function rotateSimpleminerCarousel(direction) {
    let newIndex = simpleMinerCarousel_currentIndex + direction;

    if (newIndex < 0 || newIndex >= simpleMinerCarousel_totalSlides) return;

    goToSimpleminerSlide(newIndex);
}

function goToSimpleminerSlide(index) {
    simpleMinerCarousel_currentIndex = index;
    simpleMinerCarousel.style.transform = `translateX(${-simpleMinerCarousel_currentIndex * 100}%)`;

    updateSimpleminerNavigationButtons();
    updateSimpleminerActiveThumbnail();
}

function updateSimpleminerNavigationButtons() {
    const prevButton = document.querySelector("#simpleminer-carousel-container .prev");
    const nextButton = document.querySelector("#simpleminer-carousel-container .next");

    prevButton.classList.toggle("disabled", simpleMinerCarousel_currentIndex === 0);
    nextButton.classList.toggle("disabled", simpleMinerCarousel_currentIndex === simpleMinerCarousel_totalSlides - 1);
}

function updateSimpleminerActiveThumbnail() {
    document.querySelectorAll("#simpleminer-thumbnails .thumbnail").forEach((thumb, index) => {
        thumb.classList.toggle("active", index === simpleMinerCarousel_currentIndex);
    });
}


//-----------------------------------------------------------------------------------------------------------------------------------------
// Code Blocks
//-----------------------------------------------------------------------------------------------------------------------------------------

const biomesCode = `
void Chunk::GenerateChunkBlocks()
{
	constexpr int CHUNK_COLUMNS_GRIDSIZEX = CHUNK_SIZE_X + CHUNK_GENERATION_NEIGHBORHOOD_OFFSET * 2;
	constexpr int CHUNK_COLUMNS_GRIDSIZEY = CHUNK_SIZE_Y + CHUNK_GENERATION_NEIGHBORHOOD_OFFSET * 2;

	constexpr int NEIGHBORHOOD_ARRAYSIZE = CHUNK_COLUMNS_GRIDSIZEX * CHUNK_COLUMNS_GRIDSIZEY;

	int terrainHeights[NEIGHBORHOOD_ARRAYSIZE] = {};
	float humidity[NEIGHBORHOOD_ARRAYSIZE] = {};
	float temperature[NEIGHBORHOOD_ARRAYSIZE] = {};
	float forestness[NEIGHBORHOOD_ARRAYSIZE] = {};
	float treeRawNoise[NEIGHBORHOOD_ARRAYSIZE] = {};

	int worldSeed = m_world->m_worldSeed;

	int terrainHeightSeed = worldSeed + 1;
	int humiditySeed = worldSeed + 2;
	int temperatureSeed = worldSeed + 3;
	int hillinessSeed = worldSeed + 4;
	int oceannessSeed = worldSeed + 5;
	int forestnessSeed = worldSeed + 6;
	int treeRawNoiseSeed = worldSeed + 7;

	for (int neighborhoodY = 0; neighborhoodY < CHUNK_COLUMNS_GRIDSIZEY; neighborhoodY++)
	{
		for (int neighborhoodX = 0; neighborhoodX < CHUNK_COLUMNS_GRIDSIZEX; neighborhoodX++)
		{
			int localX = neighborhoodX - CHUNK_GENERATION_NEIGHBORHOOD_OFFSET;
			int localY = neighborhoodY - CHUNK_GENERATION_NEIGHBORHOOD_OFFSET;

			int globalX = (int)m_worldPosition.x + localX;
			int globalY = (int)m_worldPosition.y + localY;
			float fGlobalX = (float)globalX;
			float fGlobalY = (float)globalY;

			int columnIndex = (neighborhoodY * CHUNK_COLUMNS_GRIDSIZEX) + neighborhoodX;


			// Generate values using Perlin noise:
			// Deterministic i.e. Compute2dPerlinNoise will give the same value for the same inputs
			// Vary SCALE values for quicker variations in values (over smaller world distances)

			float terrainHeightPerlinAbs =
				fabsf(Compute2dPerlinNoise(
								fGlobalX,
								fGlobalY,
								TERRAIN_HEIGHT_SCALE,
								NUM_OCTAVES,
								OCTAVE_PERSISTENCE_DEFAULT,
								OCTAVE_SCALE_DEFAULT,
								false,
								terrainHeightSeed));
			int rawTerrainHeight =
				(int)RangeMapClamped(terrainHeightPerlinAbs, 0.f, 1.f, RIVER_BED, MAX_MOUNTAIN_HEIGHT);
			
			humidity[columnIndex] =
				0.5f + 0.5f * Compute2dPerlinNoise(
									fGlobalX,
									fGlobalY,
									HUMIDITY_SCALE,
									NUM_OCTAVES,
									OCTAVE_PERSISTENCE_DEFAULT,
									OCTAVE_SCALE_DEFAULT,
									false,
									humiditySeed);
			temperature[neighborhoodY * CHUNK_COLUMNS_GRIDSIZEX + neighborhoodX] =
				0.5f + 0.5f * Compute2dPerlinNoise(
									fGlobalX,
									fGlobalY,
									TERMPERATURE_SCALE,
									NUM_OCTAVES,
									OCTAVE_PERSISTENCE_DEFAULT,
									OCTAVE_SCALE_DEFAULT,
									false,
									temperatureSeed);
		
			float hilliness =
				0.5f + 0.5f * Compute2dPerlinNoise(
									fGlobalX,
									fGlobalY,
									HILLINESS_SCALE,
									NUM_OCTAVES,
									OCTAVE_PERSISTENCE_DEFAULT,
									OCTAVE_SCALE_DEFAULT,
									false,
									hillinessSeed);
			hilliness = SmoothStep(hilliness);

			if (rawTerrainHeight > SEA_LEVEL)
			{
				int heightAboveSeaLevel = rawTerrainHeight - SEA_LEVEL;
				float hillinessAffectedHeight = (float)heightAboveSeaLevel * hilliness;
				terrainHeights[columnIndex] = SEA_LEVEL + (int)hillinessAffectedHeight;
			}
			else
			{
				terrainHeights[columnIndex] = rawTerrainHeight;
			}

			float oceanness =
				0.5f + 0.5f * Compute2dPerlinNoise(
									fGlobalX,
									fGlobalY,
									OCEANNESS_SCALE,
									NUM_OCTAVES,
									OCTAVE_PERSISTENCE_DEFAULT,
									OCTAVE_SCALE_DEFAULT,
									false,
									oceannessSeed);
			oceanness = SmoothStep(SmoothStep(oceanness));
			terrainHeights[columnIndex] -= int((float)MAX_OCEAN_DEPTH * oceanness);

			forestness[columnIndex] =
				0.5f + 0.5f * Compute2dPerlinNoise(
									fGlobalX,
									fGlobalY,
									FORESTNESS_SCALE,
									NUM_OCTAVES,
									OCTAVE_PERSISTENCE_DEFAULT,
									OCTAVE_SCALE_DEFAULT,
									false,
									forestnessSeed);
			forestness[columnIndex] = EaseOutQuartic(forestness[columnIndex]);
			treeRawNoise[columnIndex] = Get2dNoiseZeroToOne(globalX, globalY, treeRawNoiseSeed);
		}
	}

	// Generate blocks by deciding what block type should be placed based on the generated biome values
	for (int blockZ = 0; blockZ < CHUNK_SIZE_Z; blockZ++)
	{
		for (int neighborhoodY = 0; neighborhoodY < CHUNK_COLUMNS_GRIDSIZEY; neighborhoodY++)
		{
			for (int neighborhoodX = 0; neighborhoodX < CHUNK_COLUMNS_GRIDSIZEX; neighborhoodX++)
			{
				IntVec3 neighborhoodColCoords(neighborhoodX, neighborhoodY, blockZ);
				unsigned char blockType =
					ComputeBlockTypeAtIndex(
							neighborhoodColCoords,
							terrainHeights,
							humidity,
							temperature,
							forestness,
							treeRawNoise);

				int localX = neighborhoodX - CHUNK_GENERATION_NEIGHBORHOOD_OFFSET;
				int localY = neighborhoodY - CHUNK_GENERATION_NEIGHBORHOOD_OFFSET;
				IntVec3 localCoords = IntVec3(localX, localY, blockZ);

				if (AreBlockCoordsInChunk(localCoords))
				{
					int blockIndex = GetBlockIndexFromCoords(localCoords);
					m_blocks[blockIndex] = Block(blockType);
				}
			}
		}
	}
}
`
document.getElementById("biomes-codeblock").textContent = biomesCode;

const chunkHandlingCode = `
void World::HandleChunkActivationDeactivation()
{
	int numChunks = (int)m_activeChunks.size() + (int)m_chunkCoordsQueuedForActivation.size();

	if (numChunks < MAX_CHUNKS)
	{
		bool didActivate = RequestActivationOfNearestChunkInRange(g_activationRadius);
		if (!didActivate)
		{
			DeactivateFarthestChunkOutOfRange(g_deactivationRadius);
		}
	}
	else
	{
		DeactivateFarthestChunkOutOfRange(0.f);
	}

	Job* completedJob = g_jobSystem->GetCompletedJob();
	ChunkGenerateJob* generateJob = dynamic_cast<ChunkGenerateJob*>(completedJob);
	if (generateJob)
	{
		m_chunkCoordsQueuedForActivation.erase(generateJob->m_chunk->m_coords);
		ActivateChunk(generateJob->m_chunk);
	}
}
`
document.getElementById("chunk-handling-codeblock").textContent = chunkHandlingCode;

const rleCode = `
bool Chunk::SaveToFile() const
{
	uint8_t currentBlockType = m_blocks[0].m_type;
	std::vector<uint8_t> fileBuffer;

	fileBuffer.push_back('G');
	fileBuffer.push_back('C');
	fileBuffer.push_back('H');
	fileBuffer.push_back('K');
	fileBuffer.push_back((uint8_t)m_world->GetChunkFileVersion());
	fileBuffer.push_back((uint8_t)CHUNK_XBITS);
	fileBuffer.push_back((uint8_t)CHUNK_YBITS);
	fileBuffer.push_back((uint8_t)CHUNK_ZBITS);

	fileBuffer.push_back((uint8_t)(m_world->m_worldSeed));
	fileBuffer.push_back((uint8_t)(m_world->m_worldSeed >> 8));
	fileBuffer.push_back((uint8_t)(m_world->m_worldSeed >> 16));
	fileBuffer.push_back((uint8_t)(m_world->m_worldSeed >> 24));

	int numBlocksWritten = 0;
	uint8_t currentNumBlocks = 1;
	for (int blockIndex = 1; blockIndex < CHUNK_BLOCKS_TOTAL; blockIndex++)
	{
		if (currentNumBlocks == UINT8_MAX || m_blocks[blockIndex].m_type != currentBlockType)
		{
			fileBuffer.push_back(currentBlockType);
			fileBuffer.push_back(currentNumBlocks);
			numBlocksWritten += currentNumBlocks;
			currentNumBlocks = 1;
			currentBlockType = m_blocks[blockIndex].m_type;
		}
		else
		{
			currentNumBlocks++;
		}
	}
	fileBuffer.push_back(currentBlockType);
	fileBuffer.push_back(currentNumBlocks);

	numBlocksWritten += currentNumBlocks;
	GUARANTEE_OR_DIE(numBlocksWritten == CHUNK_BLOCKS_TOTAL, "Could not write all blocks to file");

	std::string fileName = m_world->GetSaveFilePath() + Stringf("Chunk(%d,%d).chunk", m_coords.x, m_coords.y);
	FileWriteBuffer(fileName, fileBuffer);

	return true;
}
`

document.getElementById("custom-binary-savefile-codeblock").textContent = rleCode;

EnlighterJS.init("pre", "code", {
    language : 'cpp',
    theme: 'dracula',
    indent: 4,
});
