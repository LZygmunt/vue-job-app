interface CompanyDTO {
  name: string
  description: string
  contactEmail: string
  contactPhone: string
}

export interface JobOfferDTO {
  id: string
  title: string
  type: string
  location: string
  description: string
  salary: string
  company: CompanyDTO
}
