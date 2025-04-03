<script setup lang="ts">
import { type Emit, type Job, JOB_SALARY, JOB_TYPE } from './JobTypes.ts'
import { type FormHTMLAttributes, reactive, watchEffect } from 'vue'
import BaseButton from './BaseButton.vue'
import FormControl from './FormControl.vue'
import type { Options } from './typesField'

interface JobManageFormProps {
  initials?: Job & { id: string }
}

const props = defineProps<JobManageFormProps>()

const job = reactive<Job>({
  type: JOB_TYPE.FullTime,
  name: '',
  description: '',
  salary: '',
  location: '',
  companyName: '',
  companyDescription: '',
  contactEmail: '',
  contactPhone: '',
})

const emit = defineEmits<Emit>()

const handleSubmit: FormHTMLAttributes['onSubmit'] = (e) => {
  emit('save:job', { ...job }, e as SubmitEvent)
}

const jobTypeOptions: Options = [
  { value: JOB_TYPE.FullTime, label: 'Full - Time' },
  { value: JOB_TYPE.PartTime, label: 'Part - Time' },
  { value: JOB_TYPE.Remote, label: 'Remote' },
  { value: JOB_TYPE.Internship, label: 'Internship' },
]
const salaryOptions: Options = [
  { value: JOB_SALARY.Under50, label: 'under $50K' },
  { value: JOB_SALARY.Between50And60, label: '$50 - $60K' },
  { value: JOB_SALARY.Between60And70, label: '$60 - $70K' },
  { value: JOB_SALARY.Between70And80, label: '$70 - $80K' },
  { value: JOB_SALARY.Between80And90, label: '$80 - $90K' },
  { value: JOB_SALARY.Between90And100, label: '$90 - $100K' },
  { value: JOB_SALARY.Between100And125, label: '$100 - $125K' },
  { value: JOB_SALARY.Between125And150, label: '$125 - $150K' },
  { value: JOB_SALARY.Between150And175, label: '$150 - $175K' },
  { value: JOB_SALARY.Between175And200, label: '$175 - $200K' },
  { value: JOB_SALARY.Over200, label: 'Over $200K' },
]

watchEffect(() => {
  if (props.initials) {
    Object.assign(job, props.initials)
  }
})
</script>

<template>
  <form
    class="space-y-4"
    @submit.prevent="handleSubmit"
  >
    <FormControl
      v-model="job.type"
      :options="jobTypeOptions"
      name="type"
      type="select"
      label="Job Type"
      required
    />

    <FormControl
      v-model="job.name"
      name="name"
      type="text"
      label="Job Name"
      required
    />

    <FormControl
      v-model="job.description"
      name="description"
      type="textarea"
      label="Description"
      rows="4"
      placeholder="Add any job duties, expectations, requirements, etc"
      required
    />

    <FormControl
      v-model="job.salary"
      :options="salaryOptions"
      placeholder="Select salary range"
      name="salary"
      type="select"
      label="Salary"
      required
    />

    <FormControl
      v-model="job.location"
      type="text"
      name="location"
      label="Location"
      placeholder="Company Location"
      required
    />

    <h3 class="text-2xl mb-5">Company Info</h3>

    <FormControl
      v-model="job.companyName"
      type="text"
      name="company"
      label="Company Name"
      placeholder="Company Name"
      required
    />

    <FormControl
      v-model="job.companyDescription"
      type="textarea"
      name="company_description"
      label="Company Description"
      rows="4"
      placeholder="What does your company do?"
      required
    />

    <FormControl
      v-model="job.contactEmail"
      type="email"
      name="contact_email"
      label="Contact Email"
      placeholder="Email address for applicants"
      required
    />

    <FormControl
      v-model="job.contactPhone"
      type="tel"
      name="contact_phone"
      label="Contact Phone"
      placeholder="Optional phone for applicants"
      required
    />

    <BaseButton
      class="w-full"
      type="submit"
    >
      Save
    </BaseButton>
  </form>
</template>
