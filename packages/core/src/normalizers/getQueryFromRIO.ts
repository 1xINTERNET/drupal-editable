import { ResourceIdentifierObject } from "jsonapi-typescript";

export interface QueryParams {
  bundle: string;
  type: string;
  uuid: string;
}

/**
 * Transform a Resource Identifier Object into an object which can
 * be passed to the Query component to resolve that entity.
 *
 * @param {ResourceIdentifierObject|ResourceIdentifierObject[]} relationship The resource identifier object
 * @return {QueryParams|QueryParams[]} An object containing the props to query the entity
 */
export const getQueryFromRIO = (
  relationship: ResourceIdentifierObject | ResourceIdentifierObject[]
): QueryParams => {
  // Handle the data property.
  const data = Array.isArray(relationship)
    ? relationship
    : (relationship as any).data
      ? (relationship as any).data
      : relationship;

  // Handle many-to-many relationships.
  if (Array.isArray(data)) {
    return (data as any).map(getQueryFromRIO);
  }

  const {
    id: uuid,
    type: typeString
  } = relationship as ResourceIdentifierObject;
  const [bundle, type] = typeString.split("--");

  return {
    bundle,
    type,
    uuid
  };
};
