'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { removeToken } from '@/context/action';
import { useAuth } from '@/context/auth';
import { deleteUser, reauthenticateWithCredential } from 'firebase/auth';
import { EmailAuthProvider } from 'firebase/auth';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { deleteUserFavourites } from './action';
export default function DeleteAccountButton() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const { toast } = useToast();
  const handleDeleteClick = async () => {
    if (auth?.currentUser?.email) {
      setIsDeleting(true);
      try {
        await reauthenticateWithCredential(
          auth.currentUser,
          EmailAuthProvider.credential(auth.currentUser?.email, password)
        );
        await deleteUserFavourites();
        await deleteUser(auth.currentUser);
        await removeToken();
        toast({
          title: 'Account deleted',
          variant: 'success',
        });
      } catch (error:any) {
        console.log(error);
        toast({
          title:
            error.code === 'auth/invalid-credential'
              ? 'Incorrect password'
              : 'Error-Delete Account',
          description: 'An error occurred',
          variant: 'destructive',
        });
      }
      setIsDeleting(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'} className="w-full">
          Delete Button
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete your account?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
            This action cannot be undone.This will permanently delete your
            account and all associated data.
            <div>
              <Label>Enter current password to continue</Label>
              <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteClick} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Account'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
