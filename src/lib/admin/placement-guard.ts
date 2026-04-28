const placementKeyRe =
  /^(hero:(home|company|jobs|events|projectsIndex)(:mobile)?|section:home:(about|milestones|ceo)|project:[a-z0-9-]+:(hero|gallery:\d+)|listing:[a-zA-Z0-9._-]+|company:[a-z0-9-]+|team:[a-z0-9-]+)$/;

export function isValidPlacementKey(key: string) {
  return placementKeyRe.test(key);
}
