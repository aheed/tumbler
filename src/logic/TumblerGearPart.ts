export interface IGearInteractor {
    setGearPosition: (set: boolean) => void
}

export class NullGearInteractor implements IGearInteractor {
    setGearPosition = (set: boolean) => {}
}
