export interface Root {
  data: Data;
}

export interface Data {
  profile: Profile;
  specialities: Speciality2[];
  visit_motive_categories: any[];
  visit_motives: VisitMo[];
  agendas: Agenda[];
  places: Place[];
  practitioners: Practitioner[];
  vaccination_center: boolean;
  has_one_patient_base: boolean;
  user_never_made_patient_request: boolean;
}

export interface Profile {
  id: number;
  name_with_title_and_determiner: string;
  name_with_title: string;
  speciality: Speciality;
  organization: boolean;
  redirect_url: string;
  has_patient_request_available: any;
  patient_request_configuration_enabled: any;
  has_any_patient_request_motive_enabled: any;
}

export interface Speciality {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  position: number;
  title_allowed: boolean;
  alternate_name: string;
  short_name: any;
  name_en: any;
  alternate_name_en: any;
  allow_multiple_booking: boolean;
  deleted_at: any;
  short_name_en: any;
  ref_motive_search_enabled: boolean;
  labels: Labels;
  seo_top: boolean;
  country: string;
  slug: string;
  regulation_sectors_search_enabled: boolean;
  kind: string;
  self_onboarding: boolean;
  searchable_by: string;
  salesforce_id: string;
  hidden: boolean;
  practitioner_identity_verification_required: boolean;
  prospect_name: string;
  salesforce_slug: string;
  data_sub_group: string;
  instant_messaging_searchability: boolean;
  recall_friendly: boolean;
  covid_vaccination_eligible: boolean;
  availabilities_first_in_search: boolean;
  features_enabled: string[];
}

export interface Labels {
  plural: string;
  singular: string;
  en_singular: any;
  singular_female: any;
}

export interface Speciality2 {
  id: number;
  name: string;
  kind: string;
}

export interface VisitMo {
  id: number;
  name: string;
  visit_motive_category_id: any;
  organization_id: number;
  speciality_id: number;
  ref_visit_motive_id?: number;
  position: number;
  telehealth: boolean;
  vaccination_motive: boolean;
  vaccination_days_range: number;
  covid_vaccination_set_appointment_organization: boolean;
  first_shot_motive: boolean;
  allow_new_patients: boolean;
  allow_new_patients_on_insurance_sector: any;
  configurations: any;
}

export interface Agenda {
  id: number;
  booking_disabled: boolean;
  booking_temporary_disabled: boolean;
  landline_number: string;
  anonymous: boolean;
  hide_practitioner: boolean;
  organization_id: number;
  visit_motive_ids_by_practice_id: VisitMotiveIdsByPracticeId;
  visit_motive_ids: number[];
  visit_motive_ids_only_for_doctors: any;
  practice_id: number;
  speciality_id: number;
  practitioner_id: number;
  patient_base_id: number;
  insurance_sector_enabled: boolean;
  equipment_agendas_required: boolean;
}

export interface VisitMotiveIdsByPracticeId {
  "73724"?: number[];
}

export interface Place {
  city: string;
  zipcode: string;
  latitude: number;
  longitude: number;
  address: string;
  id: string;
  name: string;
  practice_ids: number[];
  landline_number?: string;
}

export interface Practitioner {
  id: number;
  profile_id: number;
  cloudinary_public_id: string;
  name: string;
  name_with_title_and_determiner: string;
  name_with_title: string;
  speciality: string;
}
