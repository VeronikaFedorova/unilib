'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { bookSchema } from '@/lib/validations';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface Props extends Partial<Book> {
  type?: 'create' | 'update';
}

const BookForm = ({ type, ...book }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      description: '',
      author: '',
      genre: '',
      rating: 1,
      totalCopies: 1,
      coverUrl: '',
      coverColor: '',
      videoUrl: '',
      summary: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name={'title'}
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Book Title
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder='Book title'
                  className='book-form_input'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'author'}
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Author
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder='Book author'
                  className='book-form_input'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'genre'}
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder='Book genre'
                  className='book-form_input'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'rating'}
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min={1}
                  max={5}
                  placeholder='Book rating'
                  className='book-form_input'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'totalCopies'}
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Total Copies
              </FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min={1}
                  max={10000}
                  placeholder='Total copies'
                  className='book-form_input'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'coverUrl'}
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Book Image
              </FormLabel>
              <FormControl>{/* File upload */}</FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'coverColor'}
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Primary Color
              </FormLabel>
              <FormControl>{/* Color picker */}</FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'description'}
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Book Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Book description'
                  className='book-form_input'
                  {...field}
                  rows={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'videoUrl'}
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Book Trailer
              </FormLabel>
              <FormControl>{/* File upload */}</FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'summary'}
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500'>
                Book Summary
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Book summary'
                  className='book-form_input'
                  {...field}
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='book-form_btn text-white'>Add Book to Library</Button>
      </form>
    </Form>
  );
};

export default BookForm;
