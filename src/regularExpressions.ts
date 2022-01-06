export const referenceDataRouteIdentifier = /route_[a-zA-Z0-9-_]*/gm;
export const referenceDataAgency = /(?<=(route_[a-zA-Z0-9-_]*\s))[A-Z]*/gm;
export const referenceDataRouteName = /(?<=\;).*/gm;
