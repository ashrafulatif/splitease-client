"use server"

import { MemberService } from "@/service/manager-service/member.service";
import { IAddMember } from "@/types/house.types";
import { updateTag } from "next/cache";

export const addMemberAction = async (payload: IAddMember) => {
    const result = await MemberService.addMember(payload);
    updateTag("house-members")
    return result
}

export const getAllMembersAction = async () => {
    const result = await MemberService.getAllMembers();
    return result
}

export const getHouseMembersAction = async (id: string) => {
    const result = await MemberService.getHouseMembers(id);
    return result
}

export const getMemberByIdAction = async (id: string) => {
    const result = await MemberService.getMemberById(id);
    return result
}

export const removeMemberAction = async (id: string) => {
    const result = await MemberService.removeMember(id);
    updateTag("house-members")
    return result
}