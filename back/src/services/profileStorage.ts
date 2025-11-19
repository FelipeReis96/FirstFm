import {createClient} from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function uploadProfileImage(file: File, userId: string) {
    const path = `avatars/${userId}-${Date.now()}.jpg`;
    const {data: image, error: uploadError} = await supabase.storage.from("upload_profile_images_fm").
    upload(path, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'image/jpeg'//hmm
    })
    if (uploadError) throw uploadError;
    const {data: urlData} = supabase.storage.from("upload_profile_images_fm").getPublicUrl(path);
    return urlData.publicUrl;
}