//----------------------------------------------------------------------------
// Code Blocks
//----------------------------------------------------------------------------

const mapSaveLoadCode = `
void SaveMap()
{
    std::vector<uint8_t> buffer;
    BufferWriter writer(buffer);

    writer.AppendByte(SAVEFILE_4CC_CODE[0]);
    writer.AppendByte(SAVEFILE_4CC_CODE[1]);
    writer.AppendByte(SAVEFILE_4CC_CODE[2]);
    writer.AppendByte(SAVEFILE_4CC_CODE[3]);
    writer.AppendByte(SAVEFILE_VERSION);
    writer.AppendUint32((uint32_t)currentMap->m_entities.size());

    currentMap->m_playerStart->AppendToBuffer(writer);

    for (int entityIndex = 0; entityIndex < (int)currentMap->m_entities.size(); entityIndex++)
    {
        if (!currentMap->m_entities[entityIndex])
        {
            writer.AppendByte(0xFF);
            continue;
        }

        currentMap->m_entities[entityIndex]->AppendToBuffer(writer);
    }

    FileWriteBuffer(Stringf("Saved\\%s.almap", mapName.c_str()), buffer);
}

//---------------------------------------------------------------------------------------------------------

void Entity::AppendToBuffer(BufferWriter& writer)
{
	writer.AppendByte((uint8_t)m_type);
	writer.AppendUint32(m_uid.m_uid);
	writer.AppendVec3(m_editorPosition);
	writer.AppendEulerAngles(m_editorOrientation);
	writer.AppendFloat(m_editorScale);
}
`

document.getElementById("map-save-load-codeblock").textContent = mapSaveLoadCode;

//-----------------------------------------------------------------------------------------------------------

const offCenterPerspectiveDemoCode = `

/*
Off-Center Projection Matrix: Microsoft DirectX Reference
2*zn/(r-l)			0					 0					0
	0				2*zn/(t-b)			0					0
(l+r)/(r-l)		(t+b)/(t-b)	  zf/(zn-zf)			-1
	0					 0				zn*zf/(zn-zf)		0
*/

Mat44 const Mat44::CreateOffCenterPersepectiveProjection(
		float angleLeft,
		float angleRight,
		float angleUp,
		float angleDown,
		float perspectiveNear,
		float perspectiveFar)
{
	float tanLeft = tanf(angleLeft);
	float tanRight = tanf(angleRight);
	float tanUp = tanf(angleUp);
	float tanDown = tanf(angleDown);

	float left = perspectiveNear * tanLeft;
	float right = perspectiveNear * tanRight;
	float top = perspectiveNear * tanUp;
	float bottom = perspectiveNear * tanDown;

	Mat44 offCenterPespectiveMatrix = Mat44();

	offCenterPespectiveMatrix.m_values[Mat44::Ix] = 2.f * perspectiveNear / (right - left);
	offCenterPespectiveMatrix.m_values[Mat44::Jy] = 2.f * perspectiveNear / (top - bottom);

	offCenterPespectiveMatrix.m_values[Mat44::Kx] = (left + right) / (right - left);
	offCenterPespectiveMatrix.m_values[Mat44::Ky] = (top + bottom) / (top - bottom);
	offCenterPespectiveMatrix.m_values[Mat44::Kz] = perspectiveFar / (perspectiveNear - perspectiveFar);
	offCenterPespectiveMatrix.m_values[Mat44::Kw] = -1.f;

	offCenterPespectiveMatrix.m_values[Mat44::Tz] =
		-1.f * perspectiveFar * perspectiveNear / (perspectiveFar - perspectiveNear);
	offCenterPespectiveMatrix.m_values[Mat44::Tw] = 0.f;

	return offCenterPespectiveMatrix;
}
`

document.getElementById("offcenterperspectivedemo-codeblock").textContent = offCenterPerspectiveDemoCode;

//-----------------------------------------------------------------------------------------------------------

const undoRedoActionCode = `
struct Action
{
	ActionType m_actionType = ActionType::NONE;
	std::vector<Entity*> m_createdEntities;
	std::vector<Vec3> m_createdEntityPositions;
	std::vector<EulerAngles> m_createdEntityOrientations;
	std::vector<float> m_createdEntityScales;
	Entity* m_actionEntity = nullptr;
	Vec3 m_actionEntityPreviousPosition = Vec3::ZERO;
	EulerAngles m_actionEntityPreviousOrientation = EulerAngles::ZERO;
	float m_actionEntityPreviousScale = 1.f;
	Activator* m_activator = nullptr;
	EntityUID m_prevLinkedActivatable = EntityUID::INVALID;
	Activatable* m_activatable = nullptr;
	EntityUID m_prevLinkedActivator = EntityUID::INVALID;
};
`

document.getElementById("undo-redo-codeblock").textContent = undoRedoActionCode;


EnlighterJS.init("pre", "code", {
    language : 'cpp',
    theme: 'dracula',
    indent: 4,
});

