export function getRelationships(entity) {
    const relationships = entity.relationships || [];
    return relationships.map(rel => ({
        ...rel,
        otherEntityNameCapitalized: rel.otherEntityName.charAt(0).toUpperCase() + rel.otherEntityName.slice(1),
        otherEntityFieldCapitalized: rel.otherEntityField ? rel.otherEntityField.charAt(0).toUpperCase() + rel.otherEntityField.slice(1) : 'Id',
        relationshipNamePlural: rel.relationshipNamePlural || `${rel.relationshipName}s`
    }));
}

export function validateRelationships(entity) {
    const relationships = entity.relationships || [];
    for (const rel of relationships) {
        if (!rel.relationshipName || rel.relationshipName.length === 0) {
            throw new Error(`Relationship name cannot be empty for entity ${entity.name}`);
        }
        if (!rel.otherEntityName || rel.otherEntityName.length === 0) {
            throw new Error(`Other entity name cannot be empty for entity ${entity.name}`);
        }
    }
    return true;
}