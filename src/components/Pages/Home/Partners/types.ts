export interface PartnerLogoAssets {
  cyanSrc: string
  colorSrc: string
}

export interface PartnerEntry extends PartnerLogoAssets {
  id: string
  name: string
  /** Logo slot width at the lg breakpoint (px). */
  slotWidth: number
  /** Logo slot height at the lg breakpoint (px). */
  slotHeight: number
}

export interface PartnerLogoProps {
  partner: PartnerEntry
  index: number
  visible: boolean
}
