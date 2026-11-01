import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
  email: z.string().trim().email('Please provide a valid email address'),
  phone: z.string().trim().max(50, 'Phone cannot exceed 50 characters').optional(),
  service: z.string().trim().min(1, 'Please select a service'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(3000, 'Message cannot exceed 3000 characters'),
  hp: z.string().optional() // Honeypot field: must be empty
});

export type ValidatedContact = z.infer<typeof contactSchema>;
