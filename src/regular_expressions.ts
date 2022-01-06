export const referenceDataRouteIdentifier = /route_[a-zA-Z0-9-]*/gm;
export const referenceDataAgency = /(?<=(route_[a-zA-Z0-9-]*\s))[A-Z]*/gm;
export const referenceDataRouteName = /(?<=\;).*/gm;
