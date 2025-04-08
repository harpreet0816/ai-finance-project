"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Pencil, X } from "lucide-react";
import React, { useState } from "react";

const BudgetProgress = ({ initailBudget, currentExpenses }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initailBudget?.amount?.toString() || ""
  );

  const percentUsed = initailBudget
    ? (currentExpenses / initailBudget.amount) * 100
    : 0;

  const handleUpdateBudget = () => {};
  const handleCancel = () => {
    setNewBudget(initailBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  return (
    <div>
      <Card>
        <CardHeader className={"flex flex-row items-center justify-between space-y-0 pb-2"}>
          <div className="flex-1">
            <CardTitle>Monthly Budget (Default Account)</CardTitle>
            <div className="flex item-center gap-2 mt-1">
              {isEditing ? (
                <div className="flex item-center gap-2">
                  <Input
                    type={"number"}
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className={"w-32"}
                    placeholder="Enter amoun"
                    autoFocus
                  />
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={handleUpdateBudget}
                  >
                    <Check className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={handleCancel}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ) : (
                <>
                  <CardDescription>
                    {initailBudget
                      ? `$${currentExpenses.toFixed(
                          2
                        )} of $${initailBudget.amount.toFixed(2)} spend`
                      : "No budget set"}
                  </CardDescription>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => setIsEditing(true)}
                    className={"h-6 w-6"}
                  >
                    <Pencil className="h-3 w-3 " />
                  </Button>
                </>
              )}
            </div>
          </div>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetProgress;
